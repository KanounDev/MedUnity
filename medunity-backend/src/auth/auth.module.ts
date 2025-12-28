import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Doctor } from '../doctor/doctor.entity';
import { Patient } from '../patients/patient.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Doctor, Patient])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}