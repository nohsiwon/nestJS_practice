import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { IssuedCoupon } from '../entities';

@Injectable()
export class IssuedCouponRepository extends Repository<IssuedCoupon> {}
