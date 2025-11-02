import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { ActivitiesService } from './activities.service';
import { Activity } from './activity.entity';

@Controller('activities')
export class ActivitiesController {
  constructor(private activityService: ActivitiesService) {}

  @Get()
  findAll() {
    return this.activityService.findAll();
  }

  @Post()
  create(@Body() data: Partial<Activity>) {
    return this.activityService.create(data);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: Partial<Activity>) {
    return this.activityService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.activityService.remove(id);
  }
}