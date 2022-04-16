import { Controller, Post, Body } from '@nestjs/common';
import { User } from '../user/user.entity';
import { AuthService } from './auth.service';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() user: Partial<User>) {
    const res = await this.authService.login(user);
    return res;
  }
}
