import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Order } from '../entities';

@Injectable()
export class OrderRepository extends Repository<Order> {}
