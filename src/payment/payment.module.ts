import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  CouponRepository,
  IssuedCouponRepository,
  OrderItemRepository,
  OrderRepository,
  ProductRepository,
  ShippingInfoRepository,
  PointRepository,
} from './repositories';
import {
  Coupon,
  IssuedCoupon,
  Order,
  OrderItem,
  Point,
  Product,
  ShippingInfo,
} from './entities';
import { AuthModule } from '../auth/auth.module';
import { PaymentService, ProductService } from './services';
import { PaymentController } from './controllers';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([
      Order,
      OrderItem,
      ShippingInfo,
      Coupon,
      IssuedCoupon,
      Product,
      Point,
    ]),
  ],
  controllers: [PaymentController],
  providers: [
    PaymentService,
    ProductService,

    OrderRepository,
    OrderItemRepository,
    ShippingInfoRepository,
    ProductRepository,
    CouponRepository,
    IssuedCouponRepository,
    PointRepository,
  ],
})
export class PaymentModule {}
