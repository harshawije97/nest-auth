import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  BadRequestException,
  NotFoundException,
  Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import * as crypto from 'crypto';
import { UsersService } from 'src/users/users.service';
import { ConfigService } from '@nestjs/config';
import { EmailService } from 'src/email/email.service';

import { Response, Request } from 'express';
import type { User } from 'src/entities/schema.entities';
import type { RegisterDto } from './dto/register-user.dto';

@Injectable()
export class AuthService {
  private logger: Logger = new Logger(AuthService.name);
  /**
   *
   */
  constructor(
    private user: UsersService,
    private jwt: JwtService,
    private emailClient: EmailService,
    private config: ConfigService,
  ) {}

  async register(dto: RegisterDto) {
    const existingUser = await this.user.findUserByEmailAsync(dto.email);
    if (existingUser) throw new ConflictException('User already exists');

    const passwordHash = await bcrypt.hash(dto.password, 12);

    const verificationToken = crypto.randomBytes(32).toString('hex');
    const verificationTokenExpiresAt = new Date(
      Date.now() + 24 * 60 * 60 * 1000, //24 hours from now
    );

    const createUser = await this.user.createNewUserAsync({
      userName: dto.name,
      email: dto.email,
      passwordHash,
      verificationToken,
      verificationTokenExpiresAt,
    });

    void this.emailClient
      .sendVerificationEmail(createUser.email, verificationToken)
      .catch((err) =>
        this.logger.error('Failed to send verification email', err),
      );

    return {
      message:
        'User created successfully. Please check your email to verify your account.',
    };
  }
}
