import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Activity } from './activity.entity';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';

@Injectable()
export class ActivityService {
  constructor(
    @InjectRepository(Activity)
    private activityRepository: Repository<Activity>,
  ) {}

  async create(dto: CreateActivityDto): Promise<Activity> {
    const activity = this.activityRepository.create(dto);
    return this.activityRepository.save(activity);
  }

  findAll(): Promise<Activity[]> {
    return this.activityRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Activity> {
    const activity = await this.activityRepository.findOneBy({ id });
    if (!activity) throw new NotFoundException('Activité non trouvée');
    return activity;
  }

  async update(id: string, dto: UpdateActivityDto): Promise<Activity> {
    await this.activityRepository.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const result = await this.activityRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Activité non trouvée');
    }
  }
}