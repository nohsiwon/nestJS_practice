import { Module } from '@nestjs/common';
import { AuthController } from './controllers';
import { UserService, AuthService } from './services';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities';
import { UserRepository } from './repositories';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [AuthController],
  providers: [AuthService, UserService, UserRepository],
  exports: [AuthService, UserService, UserRepository],
})
export class AuthModule {}
