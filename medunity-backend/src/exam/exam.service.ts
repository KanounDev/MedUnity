// src/exam/exam.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Exam } from './exam.entity';
import { CreateExamDto } from './dto/create-exam.dto';
import { UpdateExamDto } from './dto/update-exam.dto';

@Injectable()
export class ExamService {
  constructor(
    @InjectRepository(Exam)
    private examRepository: Repository<Exam>,
  ) {}

  async create(createDto: CreateExamDto): Promise<Exam> {
    const exam = this.examRepository.create(createDto);
    return this.examRepository.save(exam);
  }

  findAll(): Promise<Exam[]> {
    return this.examRepository.find({
      relations: ['doctor', 'patient'],
      order: { date: 'DESC', createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Exam> {
    const exam = await this.examRepository.findOne({
      where: { id },
      relations: ['doctor', 'patient'],
    });
    if (!exam) throw new NotFoundException('Examen non trouvé');
    return exam;
  }

  async update(id: string, updateDto: UpdateExamDto): Promise<Exam> {
    await this.examRepository.update(id, updateDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const result = await this.examRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Examen non trouvé');
    }
  }

  // Useful extra methods
  async findByPatient(patientId: string): Promise<Exam[]> {
    return this.examRepository.find({
      where: { patientId },
      relations: ['doctor'],
      order: { date: 'DESC' },
    });
  }

  async findByDoctor(doctorId: string): Promise<Exam[]> {
    return this.examRepository.find({
      where: { doctorId },
      relations: ['patient'],
      order: { date: 'DESC' },
    });
  }
}