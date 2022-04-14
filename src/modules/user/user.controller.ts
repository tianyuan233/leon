import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('findAll')
  findAll(): string {
    return this.userService.findAll();
  }

  @Post('create')
  async createUser(@Body() user: Partial<User>) {
    const res = await this.userService.createUser(user);
    return res;
  }
}
