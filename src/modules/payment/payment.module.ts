import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Payment } from './entities/payment.entity';
import { PaymentController } from './api/payment.controller';
import { PaymentService } from './api/payment.service';

@Module({
  imports: [
    MikroOrmModule.forFeature([Payment]), // Import the entity into MikroORMModule
  ],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}
