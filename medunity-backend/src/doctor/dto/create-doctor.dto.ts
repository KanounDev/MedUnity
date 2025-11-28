// src/doctor/dto/create-doctor.dto.ts
import { IsString, IsEmail, IsArray, IsOptional } from 'class-validator';

export class CreateDoctorDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  specialty: string;

  @IsArray()
  @IsString({ each: true })
  degrees: string[];

  @IsString()
  @IsOptional()
  experience?: string;

  @IsString()
  photo: string; // base64

  @IsString()
  @IsOptional()
  bio?: string;

  @IsEmail()
  email: string;
}