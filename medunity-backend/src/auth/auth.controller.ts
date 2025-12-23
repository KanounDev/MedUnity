// src/auth/auth.controller.ts
import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

class LoginDto {
  email: string;
  password: string;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login-doctor')
  async loginDoctor(@Body() loginDto: LoginDto) {
    const result = await this.authService.validateDoctor(loginDto.email, loginDto.password);

    if (!result.allowed) {
      throw new UnauthorizedException('Identifiants invalides');
    }

    return {
      role: result.role, // 'doctor' or 'admin'
      message: 'Connexion réussie',
    };
  }
  @Post('login-patient')
  async loginPatient(@Body() loginDto: LoginDto) {
    const result = await this.authService.validatePatient(loginDto.email, loginDto.password);

    if (!result.allowed) {
      throw new UnauthorizedException('Identifiants invalides');
    }

    return {
      message: 'Connexion réussie',
    };
  }
}