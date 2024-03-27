import { Body, Controller, Post, Req } from '@nestjs/common';
import { PaymentService, ProductService } from '../services';
import { CreateOrderDto } from '../dto';
import { Transactional } from 'typeorm-transactional';

@Controller('payment')
export class PaymentController {
  constructor(
    private readonly paymentService: PaymentService,
    private readonly productService: ProductService,
  ) {}

  @Post('order')
  @Transactional()
  async order(@Req() req, @Body() createOrderDto: CreateOrderDto) {
    const initOrder = await this.paymentService.initOrder(createOrderDto);
    const completeOrder = await this.paymentService.completeOrder(initOrder.id);

    return { completeOrder };
  }
}
