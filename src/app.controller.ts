import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AppService } from './app.service';
import CreditCardDto from './dto/credit-card.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  validateCreditCard(@Body() creditCard: CreditCardDto): boolean {
    return this.appService.validateCreditCardNumber(creditCard.cardNumber);
  }
}
