import { IsString, IsOptional } from 'class-validator';

export class CreateNewsDto {
  @IsString()
  title: string;

  @IsString()
  date: string;

  @IsString()
  content: string;

  @IsString()
  @IsOptional()
  image?: string;
}