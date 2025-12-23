import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Patient } from './patient.entity';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(Patient)
    private patientRepository: Repository<Patient>,
  ) {}

  async create(createDto: CreatePatientDto): Promise<Patient> {
     const patientData = { ...createDto };
    
        // Hash password if provided
        if (patientData.password) {
          patientData.password = await bcrypt.hash(patientData.password, 10);
        }

        const patient = this.patientRepository.create(patientData);
        return this.patientRepository.save(patient);
  }

  findAll(): Promise<Patient[]> {
    return this.patientRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Patient> {
    const patient = await this.patientRepository.findOneBy({ id });
    if (!patient) throw new NotFoundException('Patient non trouvé');
    return patient;
  }

  async update(id: string, updateDto: UpdatePatientDto): Promise<Patient> {
      const updateData = { ...updateDto };
  
      // Only hash password if a new one is provided
      if (updateData.password) {
        updateData.password = await bcrypt.hash(updateData.password, 10);
      }
  
      const result = await this.patientRepository.update(id, updateData);
  
      if (result.affected === 0) {
        throw new NotFoundException('Patient non trouvé');
      }
  
      return this.findOne(id);
    }

  async remove(id: string): Promise<void> {
    const result = await this.patientRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Patient non trouvé');
    }
  }
}