import { Injectable } from '@nestjs/common';
import { InjectRepository, InjectEntityManager } from '@nestjs/typeorm';
import { Repository, EntityManager } from 'typeorm';
import { User } from '../entities';
import { CreateUserDto } from '../dto';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {
    super(repo.target, repo.manager, repo.queryRunner);
  }

  async findOneByEmail(email: string) {
    return this.repo.findOneBy({ email });
  }

  async createUser(createUserDto: CreateUserDto, hashedPassword: string) {
    const { name, email, phone, role } = createUserDto;

    const user = new User();

    user.name = name;
    user.email = email;
    user.password = hashedPassword;
    user.phone = phone;
    user.role = role;
    return this.repo.save(user);
  }
}
