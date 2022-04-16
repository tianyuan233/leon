import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly configService: ConfigService,
  ) {
    const username = this.configService.get('ADMIN_USER', 'admin');
    const password = this.configService.get('ADMIN_PASSWD', 'admin');
    this.createUser({ username, password })
      .then((_) => {
        console.log();
        console.log(
          `管理员账户创建成功，用户名：${username}，密码：${password}，请及时登录系统修改默认密码`,
        );
        console.log();
      })
      .catch((_) => {
        console.log();
        console.log(
          `管理员账户已经存在，用户名：${username}，密码：${password}，请及时登录系统修改默认密码`,
        );
        console.log();
      });
  }

  findAll(): string {
    return 'This action returns all users';
  }

  async createUser(user: Partial<User>): Promise<User> {
    const { username, password } = user;
    if (!username || !password) {
      throw new HttpException('请输入用户名和密码', HttpStatus.BAD_REQUEST);
    }

    const existUser = await this.userRepository.findOne({
      where: { username },
    });
    if (existUser) {
      throw new HttpException('用户已存在', HttpStatus.BAD_REQUEST);
    }

    const newUser = await this.userRepository.create(user);
    await this.userRepository.save(newUser);
    return newUser;
  }

  async login(user: Partial<User>): Promise<Partial<User>> {
    const { username, password } = user;
    if (!username || !password) {
      throw new HttpException('请输入用户名和密码', HttpStatus.BAD_REQUEST);
    }

    const existUser = await this.userRepository.findOne({
      where: { username },
    });
    if (!existUser) {
      throw new HttpException('用户不存在', HttpStatus.BAD_REQUEST);
    }

    const isValid = await User.comparePassword(password, existUser.password);
    if (!isValid) {
      throw new HttpException('密码错误', HttpStatus.BAD_REQUEST);
    }
    const { password: _, ...userInfo } = existUser;

    return userInfo;
  }

  async findById(id): Promise<User> {
    return this.userRepository.findOne({
      where: { id },
    });
  }
}
