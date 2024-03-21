import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { AccessToken, User } from '../entities';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AccessTokenRepository extends Repository<AccessToken> {
  constructor(
    @InjectRepository(AccessToken)
    private readonly repository: Repository<AccessToken>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  async saveAccessToken(
    jti: string,
    user: User,
    token: string,
    expiresAt: Date,
  ): Promise<AccessToken> {
    const accessToken = new AccessToken();
    accessToken.jti = jti;
    accessToken.user = user;
    accessToken.token = token;
    accessToken.expiresAt = expiresAt;
    accessToken.isRevoked = false;
    return this.save(accessToken);
  }

  async findOneByJti(jti: string): Promise<AccessToken> {
    return this.findOneBy({ jti, isRevoked: false });
  }
}
