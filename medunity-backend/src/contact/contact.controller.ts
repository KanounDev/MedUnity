// src/contact/contact.controller.ts
import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactMessageDto } from './dto/create-contact-message.dto';
import { MessageStatus } from './contact-message.entity';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post() 
  create(@Body() createDto: CreateContactMessageDto) {
    return this.contactService.create(createDto);
  }

  @Get() 
  findAll() {
    return this.contactService.findAll();
  }

  @Get('unread-count') 
  getUnreadCount() {
    return this.contactService.getUnreadCount();
  }

  @Patch(':id/status') 
  updateStatus(
    @Param('id') id: string,
    @Body('status') status: MessageStatus,
  ) {
    return this.contactService.updateStatus(id, status);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contactService.remove(id);
  }
}