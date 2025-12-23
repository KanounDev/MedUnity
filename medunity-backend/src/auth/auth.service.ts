// src/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Doctor } from '../doctor/doctor.entity';
import { Patient } from '../patients/patient.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Doctor)
    private doctorRepository: Repository<Doctor>,
    @InjectRepository(Patient)
    private patientRepository: Repository<Patient>,
  ) { }

  async validateDoctor(email: string, password: string): Promise<{ allowed: boolean; role: 'doctor' | 'admin'; id?: string }> {
    // Special case: admin bypass
    if (email.toLowerCase() === 'admin@medunity.com') {
      return { allowed: true, role: 'admin' };
    }

    // Regular doctor: check in database
    const doctor = await this.doctorRepository.findOne({
      where: { email: email.toLowerCase() },
      select: ['id', 'password'], // Only fetch password for comparison
    });

    if (!doctor || !doctor.password) {
      return { allowed: false, role: 'doctor' };
    }

    const isPasswordValid = await bcrypt.compare(password, doctor.password);

    if (!isPasswordValid) {
      return { allowed: false, role: 'doctor' };
    }

    return { allowed: true, role: 'doctor', id: doctor.id };
  }

  // src/auth/auth.service.ts

  async validatePatient(email: string, password: string): Promise<{ allowed: boolean; id?: string }> {
    const patient = await this.patientRepository.findOne({
      where: { email: email.toLowerCase() },
      select: ['id', 'password'],
    });

    if (!patient || !patient.password) {
      return { allowed: false };
    }

    const isPasswordValid = await bcrypt.compare(password, patient.password);

    if (!isPasswordValid) {
      return { allowed: false };
    }

    return { allowed: true, id: patient.id }; // ← Add id here
  }
}