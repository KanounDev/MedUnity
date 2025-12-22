import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { ContactMessage } from './contact/contact-message.entity';
import { Doctor } from './doctor/doctor.entity';
import { Activity } from './activity/activity.entity';
import { News } from './news/news.entity';
import { Patient } from './patients/patient.entity';

dotenv.config();

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [ContactMessage, Doctor, Activity, News, Patient],
    migrations: [__dirname + '/migrations/*.ts'],
    synchronize: false,
});
