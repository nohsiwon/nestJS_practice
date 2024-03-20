import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto';
import { UserRepository } from '../repositories';
import * as argon2 from 'argon2';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;
    const user = await this.userRepository.findOneByEmail(email);

    if (user) {
      throw new BadRequestException(`이미 ${email}의 회원이 존재합니다`);
    }

    const hashedPassword = await argon2.hash(password);

    return this.userRepository.createUser(createUserDto, hashedPassword);
  }
}
