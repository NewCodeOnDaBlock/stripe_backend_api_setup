import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class Payment {
  @PrimaryKey()
  id!: number;

  @Property()
  amount!: number;

  @Property()
  paymentMethodId!: string;

  constructor(amount: number, paymentMethodId: string) {
    this.amount = amount;
    this.paymentMethodId = paymentMethodId;
  }
}
