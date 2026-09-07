import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class RegisterDto {
  // email
  @ApiProperty({ example: 'harsha@example.com' })
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  // password
  @ApiProperty({ example: 'password@123' })
  @IsString()
  @IsNotEmpty()
  password!: string;
}
