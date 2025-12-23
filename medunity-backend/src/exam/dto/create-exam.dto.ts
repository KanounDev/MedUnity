// src/exam/dto/create-exam.dto.ts
import { IsString, IsUUID, IsDateString, IsEnum, IsOptional } from 'class-validator';

export class CreateExamDto {
  @IsString()
  type: string;

  @IsDateString() // Validates ISO date string like "2025-12-23"
  date: string;

  @IsUUID('4')
  doctorId: string;

  @IsUUID('4')
  patientId: string;

  @IsEnum(['Pending', 'In Progress', 'Ready', 'Completed'])
  @IsOptional()
  status?: 'Pending' | 'In Progress' | 'Ready' | 'Completed';

  @IsString()
  @IsOptional()
  fileUrl?: string;
}