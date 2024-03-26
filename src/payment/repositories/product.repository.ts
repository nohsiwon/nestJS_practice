import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Product } from '../entities';

@Injectable()
export class ProductRepository extends Repository<Product> {}
