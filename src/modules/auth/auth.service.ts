import { Injectable } from '@nestjs/common';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  createToken(user) {
    return this.jwtService.sign(user);
  }

  async login(user: Partial<User>): Promise<any> {
    const data = await this.userService.login(user);
    const token = this.createToken(data);
    return { ...data, token };
  }

  async validateUser(payload: Partial<User>): Promise<User> {
    const user = await this.userService.findById(payload.id);
    return user;
  }
}
