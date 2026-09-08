import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Resend } from 'resend';

@Injectable()
export class EmailService {
  private emailClient: Resend;
  /**
   *
   */
  constructor(private config: ConfigService) {
    this.emailClient = new Resend(this.config.get('RESEND_API'));
  }

  public async sendVerificationEmail(email: string, token: string) {
    const appUrl = this.config.get<string>('APP_URL');
    const verifyUrl = `${appUrl}/api/auth/verify-email?token=${token}`;

    await this.emailClient.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: 'Verify your email',
      html: `<h2>Please verify your email address to continue</h2>
        <p>Click the link below for the verification. This link will redirect you to the authorization page</p>
        <a herf="${verifyUrl}" style={color: 'blue'}>Click here.</a>`,
    });
  }

  public async sendPasswordResetEmail(email: string, token: string) {
    const appUrl = this.config.get<string>('APP_URL');
    const verifyUrl = `${appUrl}/api/auth/reset-password?token=${token}`;

    await this.emailClient.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: 'Reset your password',
      html: `<h2>Please reset your password & continue</h2>
        <p>Click the link below for the verification. This link will redirect you to the authorization page</p>
        <a herf="${verifyUrl}" style={color: 'blue'}>Click here.</a>`,
    });
  }
}
