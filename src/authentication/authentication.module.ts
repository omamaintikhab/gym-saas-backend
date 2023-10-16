import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt-strategies';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';
import { HashService } from './hashPassword';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: 'YOUR_SECRET_KEY', // Replace this with your actual secret key
      signOptions: { expiresIn: '60s' }, // Set the expiration time according to your needs
    }),
  ],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, JwtStrategy, HashService, 
  ],
})
export class AuthenticationModule {}
