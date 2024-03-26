import { Repository } from 'typeorm';
import { OrderItem } from '../entities';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OrderItemRepository extends Repository<OrderItem> {}
