import { Injectable } from '@nestjs/common';
import { ShippingInfo } from '../entities';
import { Repository } from 'typeorm';

@Injectable()
export class ShippingInfoRepository extends Repository<ShippingInfo> {}
