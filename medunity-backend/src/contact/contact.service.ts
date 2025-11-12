import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContactMessage, MessageStatus } from './contact-message.entity';
import { CreateContactMessageDto } from './dto/create-contact-message.dto';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(ContactMessage)
    private messagesRepository: Repository<ContactMessage>,
  ) {}

  // 1. Logic for handling new form submission
  async create(createDto: CreateContactMessageDto): Promise<ContactMessage> {
    const newMessage = this.messagesRepository.create(createDto);
    // TODO: Implement logic here to send email notification to Admin
    // const adminEmail = process.env.ADMIN_EMAIL;
    // await this.sendNotificationEmail(adminEmail, newMessage.subject);
    return this.messagesRepository.save(newMessage);
  }

  // 2. Logic for Admin to fetch all messages (newest first)
  findAll(): Promise<ContactMessage[]> {
    return this.messagesRepository.find({
      order: {
        createdAt: 'DESC',
      },
    });
  }

  // 3. Logic to get the count of UNREAD messages for the header badge
  getUnreadCount(): Promise<number> {
    return this.messagesRepository.count({
      where: {
        status: MessageStatus.UNREAD,
      },
    });
  }

  // 4. Logic for Admin to mark a message as read/change status
  async updateStatus(id: string, status: MessageStatus): Promise<ContactMessage> {
    await this.messagesRepository.update(id, { status });
    return this.messagesRepository.findOneByOrFail({ id });
  }
}