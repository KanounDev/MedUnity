// src/doctor/doctor.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('doctors')
export class Doctor {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  title?: string;

  @Column()
  specialty: string;

  @Column('text', { array: true, default: '{}' })
  degrees: string[];

  @Column({ nullable: true })
  experience?: string;

  @Column({ nullable: true })
  photo?: string; // base64 string

  @Column({ nullable: true })
  bio?: string;

  @Column({ unique: true })
  email: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}