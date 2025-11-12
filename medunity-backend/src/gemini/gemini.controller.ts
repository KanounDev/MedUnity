// src/gemini/gemini.controller.ts

import { Controller, Post, Body } from '@nestjs/common';
import { GeminiService } from './gemini.service';

@Controller('gemini')
export class GeminiController {
  constructor(private readonly geminiService: GeminiService) {}

  @Post('ask')
  async askQuestion(@Body('question') question: string) {
    if (!question) {
      return { answer: "Veuillez poser une question." };
    }
    const answer = await this.geminiService.getMedUnityAnswer(question);
    return { answer };
  }
}