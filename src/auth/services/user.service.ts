import { BadRequestException, Injectable } from '@nestjs/common';
import { SignUpReqDto } from '../dto';
import { AccessTokenRepository, UserRepository } from '../repositories';
import * as argon2 from 'argon2';
import { User } from '../entities';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly accessTokenRepository: AccessTokenRepository,
  ) {}

  async createUser(SignUpReqDto: SignUpReqDto) {
    const { email, password } = SignUpReqDto;
    const user = await this.userRepository.findOneByEmail(email);

    if (user) {
      throw new BadRequestException(`이미 ${email}의 회원이 존재합니다`);
    }

    const hashedPassword = await argon2.hash(password);

    return this.userRepository.createUser(SignUpReqDto, hashedPassword);
  }

  async validateUser(id: string, jti: string): Promise<User> {
    const [user, token] = await Promise.all([
      this.userRepository.findOneBy({ id }),
      this.accessTokenRepository.findOneByJti(jti),
    ]);

    if (!user) {
      throw new BadRequestException(`user not found`);
    }

    if (!token) {
      throw new BadRequestException(`revoked token`);
    }

    return user;
  }
}
