import { UserRole } from '../entities';

export type SignUpReqDto = {
  name: string;
  email: string;
  password: string;
  phone: string;
  role: UserRole;
};
