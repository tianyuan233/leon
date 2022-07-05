import {
  Req,
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { JwtService } from '@nestjs/jwt';
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('findAll')
  findAll(@Req() req): User {
    let token = req.headers.authorization;

    if (!token) {
      throw new HttpException('请登录', HttpStatus.UNAUTHORIZED);
    }

    if (/Bearer/.test(token)) {
      // 不需要 Bearer，否则验证失败
      token = token.split(' ').pop();
    }
    const tokenUser = this.jwtService.decode(token) as User;
    const id = tokenUser.id;

    if (!id) {
      throw new HttpException('未认证', HttpStatus.UNAUTHORIZED);
    }
    return tokenUser;
  }

  @Post('register')
  async createUser(@Body() user: Partial<User>) {
    const res = await this.userService.createUser(user);
    return res;
  }
}
