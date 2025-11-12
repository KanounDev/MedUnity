import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DoctorsModule } from './doctors/doctors.module';
import { ActivitiesModule } from './activities/activities.module';
import { NewsModule } from './news/news.module';
import { GeminiModule } from './gemini/gemini.module'; // 👈 NEW: Import the Gemini Module

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true, // Warning: dev only!
      }),
      inject: [ConfigService],
    }),
    DoctorsModule,
    ActivitiesModule,
    NewsModule,
    GeminiModule, // 👈 NEW: Add the Gemini Module to the imports array
  ],
})
export class AppModule {}