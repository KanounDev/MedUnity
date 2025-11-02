import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('activity')
export class Activity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  title: string;

  @Column('text')
  description: string;

  @Column({ nullable: true })
  image: string;
}