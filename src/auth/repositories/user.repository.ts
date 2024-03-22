import { Injectable } from '@nestjs/common';
import { InjectRepository, InjectEntityManager } from '@nestjs/typeorm';
import { Repository, EntityManager } from 'typeorm';
import { User } from '../entities';
import { SignUpReqDto } from '../dto';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  async findOneByEmail(email: string) {
    return this.repository.findOneBy({ email });
  }

  async createUser(SignUpReqDto: SignUpReqDto, hashedPassword: string) {
    const { name, email, phone, role } = SignUpReqDto;

    const user = new User();

    user.name = name;
    user.email = email;
    user.password = hashedPassword;
    user.phone = phone;
    user.role = role;
    return this.repository.save(user);
  }
}
