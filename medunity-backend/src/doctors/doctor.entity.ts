import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Doctor {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  specialty: string;

  @Column('simple-array')
  degrees: string[];

  @Column({ nullable: true })
  photo?: string;
}