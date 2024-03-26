import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Point } from '../entities';

@Injectable()
export class PointRepository extends Repository<Point> {}
