import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Coupon } from '../entities';

@Injectable()
export class CouponRepository extends Repository<Coupon> {}
