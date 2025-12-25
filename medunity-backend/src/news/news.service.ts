// src/news/news.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeepPartial } from 'typeorm';
import { News } from './news.entity';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(News)
    private newsRepository: Repository<News>,
  ) {}

  async create(dto: CreateNewsDto): Promise<News> {
    const paragraphs = dto.content
      ? dto.content
          .split('\n\n')
          .map(p => p.trim())
          .filter(p => p.length > 0)
      : [];

    const newsData: DeepPartial<News> = {
      title: dto.title,
      date: dto.date,
      paragraphs,
      image: dto.image ?? null,
    };

    const news = this.newsRepository.create(newsData);

    return this.newsRepository.save(news);
  }

  findAll(): Promise<News[]> {
    return this.newsRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<News> {
    const item = await this.newsRepository.findOneBy({ id });
    if (!item) throw new NotFoundException('News not found');
    return item;
  }

  async update(id: string, dto: UpdateNewsDto): Promise<News> {
    const news = await this.findOne(id); // Ensure it exists

    const updateData: Partial<News> = {};

    if (dto.title !== undefined) updateData.title = dto.title;
    if (dto.date !== undefined) updateData.date = dto.date;
    if (dto.image !== undefined) updateData.image = dto.image ?? null;

    // Special handling for content → paragraphs
    if (dto.content !== undefined) {
      updateData.paragraphs = dto.content
        ? dto.content
            .split('\n\n')
            .map(p => p.trim())
            .filter(p => p.length > 0)
        : [];
    }

    await this.newsRepository.update(id, updateData);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const result = await this.newsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('News not found');
    }
  }
}