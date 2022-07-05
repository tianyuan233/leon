import { Module, forwardRef } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

const jwtModule = JwtModule.register({
  secret: 'leon',
  signOptions: { expiresIn: '4h' },
});
@Module({
  imports: [forwardRef(() => UserModule), jwtModule],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [jwtModule],
})
export class AuthModule {}
