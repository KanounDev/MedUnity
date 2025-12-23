// src/exam/exam.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Doctor } from '../doctor/doctor.entity';
import { Patient } from '../patients/patient.entity';

@Entity('exams')
export class Exam {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  type: string;

  @Column({ type: 'date' }) // Recommended: use date type for proper querying/sorting
  date: string; // Stored as "YYYY-MM-DD"

  @Column({
    type: 'enum',
    enum: ['Pending', 'In Progress', 'Ready', 'Completed'],
    default: 'Pending',
  })
  status: 'Pending' | 'In Progress' | 'Ready' | 'Completed';

  @Column({ nullable: true })
  fileUrl?: string;

  // Relation to Doctor
  @ManyToOne(() => Doctor, (doctor) => doctor.exams, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'doctorId' })
  doctor: Doctor;

  @Column('uuid')
  doctorId: string;

  // Relation to Patient
  @ManyToOne(() => Patient, (patient) => patient.exams, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'patientId' })
  patient: Patient;

  @Column('uuid')
  patientId: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}