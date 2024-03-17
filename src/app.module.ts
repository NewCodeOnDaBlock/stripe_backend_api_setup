import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { PaymentModule } from './modules/payment/payment.module';

@Module({
  imports: [MikroOrmModule.forRoot(), PaymentModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
