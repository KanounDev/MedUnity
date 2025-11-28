// src/doctor/doctor.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Doctor } from './doctor.entity';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';

@Injectable()
export class DoctorService {
  constructor(
    @InjectRepository(Doctor)
    private doctorRepository: Repository<Doctor>,
  ) {}

  async create(createDto: CreateDoctorDto): Promise<Doctor> {
    const doctor = this.doctorRepository.create(createDto);
    return this.doctorRepository.save(doctor);
  }

  findAll(): Promise<Doctor[]> {
    return this.doctorRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Doctor> {
    const doctor = await this.doctorRepository.findOneBy({ id });
    if (!doctor) throw new NotFoundException('Médecin non trouvé');
    return doctor;
  }

  async update(id: string, updateDto: UpdateDoctorDto): Promise<Doctor> {
    await this.doctorRepository.update(id, updateDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const result = await this.doctorRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Médecin non trouvé');
    }
  }
}