import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
// In src/patient/patient.entity.ts (add import + property)
import { OneToMany } from 'typeorm';
import { Exam } from '../exam/exam.entity';


@Entity('patients')
export class Patient {
  @OneToMany(() => Exam, (exam) => exam.patient)
  exams: Exam[];
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  fullName: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  password: string;

  @Column()
  birthDate: string; // format: "1990-05-15" or "15/05/1990" – you choose

  @Column()
  phone: string;

  @Column({ nullable: true })
  photo?: string; // base64

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}