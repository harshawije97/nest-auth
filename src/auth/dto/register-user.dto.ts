import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEmpty,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

export class RegisterDto {
  @ApiProperty({ example: 'Harshana Wijesinghe' })
  @IsString()
  @IsNotEmpty()
  name!: string;

  // email
  @ApiProperty({ example: 'harsha@example.com' })
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  // password
  @ApiProperty({ example: 'password@123', minLength: 8 })
  @IsString()
  @MinLength(8)
  password!: string;

  // role
  @ApiProperty({ example: 'guest' })
  @IsString()
  @IsEmpty()
  role!: string;
}
