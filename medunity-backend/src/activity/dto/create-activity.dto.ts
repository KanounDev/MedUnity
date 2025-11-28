import { IsString, IsOptional } from 'class-validator';

export class CreateActivityDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  @IsOptional()
  image?: string; // base64
}