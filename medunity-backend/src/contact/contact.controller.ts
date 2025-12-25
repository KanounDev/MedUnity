// src/contact/contact.controller.ts
import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactMessageDto } from './dto/create-contact-message.dto';
import { MessageStatus } from './contact-message.entity';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post() // POST /contact (from homepage form)
  create(@Body() createDto: CreateContactMessageDto) {
    return this.contactService.create(createDto);
  }

  @Get() // GET /contact (for admin dashboard list)
  findAll() {
    return this.contactService.findAll();
  }

  @Get('unread-count') // GET /contact/unread-count (for admin header badge)
  getUnreadCount() {
    return this.contactService.getUnreadCount();
  }

  @Patch(':id/status') // PATCH /contact/:id/status (to mark as READ, etc.)
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