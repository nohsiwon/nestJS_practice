import { UserRole } from '../entities';

export class CreateUserDto {
  name: string;
  email: string;
  password: string;
  phone: string;
  role: UserRole;
}
