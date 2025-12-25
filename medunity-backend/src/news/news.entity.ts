import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('news')
export class News {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  date: string; // e.g. "Novembre 2025"

  @Column('json', { nullable: true })
  paragraphs?: string[] | null; // each element is a paragraph


  @Column({ type: 'text', nullable: true })
  image?: string | null; // base64 or URL

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}