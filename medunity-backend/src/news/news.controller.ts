import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { NewsService } from './news.service';
import { News } from './news.entity';

@Controller('news')
export class NewsController {
  constructor(private newsService: NewsService) {}

  @Get()
  findAll() {
    return this.newsService.findAll();
  }

  @Post()
  create(@Body() data: Partial<News>) {
    return this.newsService.create(data);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: Partial<News>) {
    return this.newsService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.newsService.remove(id);
  }
}