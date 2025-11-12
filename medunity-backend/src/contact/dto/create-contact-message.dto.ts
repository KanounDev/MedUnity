// Used for POST requests from the contact form
export class CreateContactMessageDto {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}