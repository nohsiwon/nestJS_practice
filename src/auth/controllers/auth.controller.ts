import { Controller, Post, Body, Req } from '@nestjs/common';
import { AuthService, UserService } from '../services';
import {
  SignUpReqDto,
  LoginResDto,
  LoginReqDto,
  SignupResDto,
  RefreshTokenDto,
} from '../dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('login')
  async login(
    @Req() req,
    @Body() loginReqDto: LoginReqDto,
  ): Promise<LoginResDto> {
    return this.authService.login(loginReqDto.email, loginReqDto.password);
  }

  @Post('signup')
  async signup(@Body() signUpReqDto: SignUpReqDto): Promise<SignupResDto> {
    const user = await this.userService.createUser(signUpReqDto);
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
    };
  }

  @Post('refresh')
  async refresh(@Body() dto: RefreshTokenDto): Promise<string> {
    return this.authService.refreshAccessToken(dto.refreshToken);
  }
}
