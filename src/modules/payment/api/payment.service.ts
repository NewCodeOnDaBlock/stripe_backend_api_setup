import { Injectable, NotFoundException } from '@nestjs/common';
import Stripe from 'stripe';
import { EntityManager } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/mysql';
import { Payment } from '../entities/payment.entity';

@Injectable()
export class PaymentService {
  private readonly stripe: Stripe;
  private readonly testSecretKey: string =
    'sk_test_51Ov2YXP0K6enjyyCZl00VvIV13wSbSDWYMD9P9lYaZxdprEC2cKYCjPPspWrF0VywWVBIcWpHBJCUQii2AnVoDwm00oF1BbfDC';

  constructor(
    private readonly em: EntityManager,
    @InjectRepository(Payment)
    private readonly paymentRepository: EntityRepository<Payment>,
  ) {
    this.stripe = new Stripe(this.testSecretKey, {
      apiVersion: '2023-10-16',
    });
  }

  async createPaymentIntent(amount: number): Promise<string> {
    const paymentIntent = await this.stripe.paymentIntents.create({
      amount,
      currency: 'usd',
    });
    return paymentIntent.client_secret;
  }

  async handlePaymentConfirmation(
    paymentMethodId: string,
    amount: number,
  ): Promise<boolean> {
    try {
      const paymentIntent =
        await this.stripe.paymentIntents.retrieve(paymentMethodId);
      if (
        paymentIntent.status === 'succeeded' &&
        paymentIntent.amount === amount
      ) {
        // Payment succeeded and amount matches, proceed with storing payment details
        const payment = new Payment(amount, paymentMethodId);
        this.em.persist(payment);
        await this.em.flush();
        return true; // Payment confirmed and stored successfully
      } else {
        // Payment failed or amount mismatch
        return false;
      }
    } catch (error) {
      console.error('Error confirming payment:', error);
      throw new NotFoundException('Payment not found');
    }
  }
}
