import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
    const news = this.newsRepository.create(dto);
    return this.newsRepository.save(news);
  }

  findAll(): Promise<News[]> {
    return this.newsRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<News> {
    const item = await this.newsRepository.findOneBy({ id });
    if (!item) throw new NotFoundException('Actualité non trouvée');
    return item;
  }

  async update(id: string, dto: UpdateNewsDto): Promise<News> {
    await this.newsRepository.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const result = await this.newsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Actualité non trouvée');
    }
  }
}