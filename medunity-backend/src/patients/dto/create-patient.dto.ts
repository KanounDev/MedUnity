import { IsString, IsEmail, IsOptional } from 'class-validator';

export class CreatePatientDto {
  @IsString()
  fullName: string;

  @IsEmail()
  email: string;

  @IsString()
  birthDate: string;

  @IsString()
  phone: string;

  @IsString()
  @IsOptional()
  photo?: string;

  @IsString()
  @IsOptional()
  password?: string;
}