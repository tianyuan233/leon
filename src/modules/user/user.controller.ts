import { Req, Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('findAll')
  findAll(@Req() req): string {
    return this.userService.findAll();
  }

  @Post('register')
  async createUser(@Body() user: Partial<User>) {
    const res = await this.userService.createUser(user);
    return res;
  }
}
