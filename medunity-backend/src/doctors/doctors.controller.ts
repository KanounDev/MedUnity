import { Controller, Get } from '@nestjs/common';
import { DoctorsService } from './doctors.service';

@Controller('doctors') // ← This makes /doctors
export class DoctorsController {
  constructor(private readonly doctorsService: DoctorsService) {}

  @Get() // ← GET /doctors
  findAll() {
    return this.doctorsService.findAll();
  }
}