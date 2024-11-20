import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  private readonly CARD_NUMBER_PATTERN = /^(?:\d[\s-]*?){13,16}$/g;

  /**
   * Just a greeting from the api
   * @returns a greeting
   */
  getHello(): string {
    return 'Credit Card Validator API!';
  }

  /**
   * The Luhn Algorithm implementation
   * @param cardNumber from the ui
   * @returns true or false
   */
  validateCreditCardNumber(cardNumber: string): boolean {
    // validating credit card format, accepting only digits, dashes or spaces
    const match = cardNumber.match(this.CARD_NUMBER_PATTERN);
    if (match.length === 0) return false;

    // removing dashes or spaces then casting string into a number array
    const digits = cardNumber.replace(/[-\s]/g, '').split('').map(Number);

    // processing card number digits with the pattern 2,1,2,1...
    for (let i = digits.length - 2; i >= 0; i -= 2) {
      let luhnValue = digits[i] * 2;

      if (luhnValue > 9) {
        luhnValue = (luhnValue % 10) + 1;
      }
      digits[i] = luhnValue;
    }

    // getting total of all luhn values
    const total = digits.reduce((sum, current) => sum + current);
    return total % 10 === 0;
  }
}
