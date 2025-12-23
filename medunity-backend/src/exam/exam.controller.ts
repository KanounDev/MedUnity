// src/exam/exam.controller.ts
import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ExamService } from './exam.service';
import { CreateExamDto } from './dto/create-exam.dto';
import { UpdateExamDto } from './dto/update-exam.dto';

@Controller('exams')
export class ExamController {
  constructor(private readonly examService: ExamService) { }
  @Get('doctor/:doctorId')
  async getExamsByDoctor(@Param('doctorId') doctorId: string) {
    return this.examService.getExamsByDoctor(doctorId);
  }

  @Get('patient/:patientId')
  async getExamsByPatient(@Param('patientId') patientId: string) {
    return this.examService.findByPatient(patientId);
  }
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/exams',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
          const ext = extname(file.originalname);
          cb(null, `exam-${uniqueSuffix}${ext}`);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(pdf|PDF)$/)) {
          return cb(new BadRequestException('Seuls les fichiers PDF sont autorisés !'), false);
        }
        cb(null, true);
      },
      limits: { fileSize: 10 * 1024 * 1024 }, // 10MB max
    }),
  )
  async create(
    @Body() createDto: CreateExamDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (file) {
      createDto.fileUrl = `/uploads/exams/${file.filename}`;
    }
    return this.examService.create(createDto);
  }

  @Patch(':id')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/exams',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
          const ext = extname(file.originalname);
          cb(null, `exam-${uniqueSuffix}${ext}`);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (file && !file.originalname.match(/\.(pdf|PDF)$/)) {
          return cb(new BadRequestException('Seuls les fichiers PDF sont autorisés !'), false);
        }
        cb(null, true);
      },
      limits: { fileSize: 10 * 1024 * 1024 },
    }),
  )
  async update(
    @Param('id') id: string,
    @Body() updateDto: Partial<CreateExamDto>,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (file) {
      (updateDto as any).fileUrl = `/uploads/exams/${file.filename}`;
    }
    return this.examService.update(id, updateDto as UpdateExamDto);
  }

  @Get()
  findAll() {
    return this.examService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.examService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.examService.remove(id);
  }
}