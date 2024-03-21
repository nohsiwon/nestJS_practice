import { Module } from '@nestjs/common';
import { AuthController } from './controllers';
import { UserService, AuthService } from './services';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccessToken, RefreshToken, User } from './entities';
import {
  AccessTokenRepository,
  RefreshTokenRepository,
  UserRepository,
} from './repositories';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies';

@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get<string>('ACCESS_TOKEN_EXPIRY'),
        },
      }),
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([User, AccessToken, RefreshToken]),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserService,
    UserRepository,
    AccessTokenRepository,
    RefreshTokenRepository,
    JwtStrategy,
  ],
  exports: [
    AuthService,
    UserService,
    UserRepository,
    AccessTokenRepository,
    RefreshTokenRepository,
    JwtStrategy,
  ],
})
export class AuthModule {}
