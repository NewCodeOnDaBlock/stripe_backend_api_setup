import { Body, Controller, Post } from '@nestjs/common';
import { PaymentService } from './payment.service';

@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('/create-payment-intent')
  async createPaymentIntent(
    @Body() data: { amount: number },
  ): Promise<{ clientSecret: string }> {
    const clientSecret = await this.paymentService.createPaymentIntent(
      data.amount,
    );
    return { clientSecret };
  }

  @Post('/confirm-payment')
  async confirmPayment(
    @Body() data: { paymentMethodId: string; amount: number },
  ): Promise<boolean> {
    return this.paymentService.handlePaymentConfirmation(
      data.paymentMethodId,
      data.amount,
    );
  }
}
