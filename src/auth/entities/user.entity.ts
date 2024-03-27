import { BaseEntity } from 'src/common/entity';
import { Order, Point } from 'src/payment/entities';
import { Column, Entity, OneToMany, OneToOne, Relation } from 'typeorm';
import { RefreshToken } from './refreshToken.entity';
import { AccessToken } from './accessToken.entity';

export type UserRole = 'admin' | 'user';

@Entity()
export class User extends BaseEntity {
  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'varchar', length: 50 })
  phone: string;

  @Column({ type: 'varchar', length: 50 })
  role: UserRole;

  @OneToMany(() => AccessToken, (token) => token.user)
  accessToken: Relation<AccessToken[]>;

  @OneToMany(() => RefreshToken, (token) => token.user)
  refreshToken: Relation<RefreshToken[]>;

  @OneToMany(() => Order, (orders) => orders.user)
  orders: Order;

  @OneToOne(() => Point, (point) => point.user)
  point: Point;
}
