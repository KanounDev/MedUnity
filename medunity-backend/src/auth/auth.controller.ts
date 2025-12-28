import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

class LoginDto {
  email: string;
  password: string;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login-doctor')
  async loginDoctor(@Body() loginDto: LoginDto) {
    const result = await this.authService.validateDoctor(loginDto.email, loginDto.password);

    if (!result.allowed) {
      throw new UnauthorizedException('Identifiants invalides');
    }

    return {
      role: result.role, // 'doctor' or 'admin'
      id: result.id,     // Include ID for doctors (undefined for admin)
      message: 'Connexion réussie',
    };
  }

  // src/auth/auth.controller.ts

  @Post('login-patient')
  async loginPatient(@Body() loginDto: LoginDto) {
    const result = await this.authService.validatePatient(loginDto.email, loginDto.password);

    if (!result.allowed) {
      throw new UnauthorizedException('Identifiants invalides');
    }

    return {
      id: result.id,                    // ← Return the patient ID
      message: 'Connexion réussie',
    };
  }
}