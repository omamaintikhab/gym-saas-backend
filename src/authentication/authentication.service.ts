import { Injectable, UnauthorizedException,  HttpException, HttpStatus  } from '@nestjs/common';
import { LoginDto, SignupDto } from './dto/signup.dto';
import { UpdateAuthenticationDto } from './dto/update-authentication.dto';
import { UserService } from 'src/user/user.service';
import { HashService } from './hashPassword';
import { QueryFailedError } from 'typeorm';
import { ER_DUP_ENTRY, USER_ALREADY_EXISTS } from 'src/constants/constants';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { LoginResponse } from './types';
import { User } from 'src/user/entities/user.entities';


@Injectable()
export class AuthenticationService {
  constructor(private readonly userService: UserService, 
    private readonly hashingService: HashService,
    ){}
  async signup(signupDto: SignupDto): Promise<any> {
    console.log('signup service')
    const hashedPassword = await this.hashingService.hashPassword(signupDto.password)
    console.log('hashedPassword', hashedPassword)
    try{
      const user = await this.userService.createUser({
        email: signupDto.email,
        password: hashedPassword,
        user_name: signupDto.name,
        user_role: signupDto.role
        
      })
      return user;
  }
  catch(e){
    if (e instanceof QueryFailedError) {
      console.log(e['code'])
      if (e['code'] === ER_DUP_ENTRY) {
        throw new HttpException(USER_ALREADY_EXISTS, HttpStatus.CONFLICT);
      }
      throw new HttpException('Database error: Query failed', HttpStatus.BAD_REQUEST);
    }
  }
  }

  async login(loginDto: LoginDto): Promise<LoginResponse> {
    console.log('login service')
    const user = await this.userService.findOUserByEmail(loginDto.email);
    console.log('ssss', user)
    if(!user){
      throw new UnauthorizedException();
    }
    console.log('logged in user', user)
    const isPasswordValid = await this.validatePassword(loginDto.password, user.password);
    console.log('is password valid', isPasswordValid)
    if (!isPasswordValid) {
      throw new UnauthorizedException();
    }
    const authToken = await this.generateToken(user)
    return {
      user_email: user.email,
      user_role: user.user_role,
      access_token: authToken,
    }
  }

  async generateToken(user: User) {
    const payload = {
      user_id: user.id,
      user_email: user.email
    }
    console.log('jwt payload', payload, typeof(payload))
    return jwt.sign(payload, 'MY_SECRET_KEY', { expiresIn: '1h' });
  }

  validateToken(token: string): any {
    try {
      return jwt.verify(token, 'MY_SECRET_KEY');
    } catch (error) {
      return null; // Or handle the error as needed
    }
  }

  async validatePassword(password: string, storedPasswordHash: string): Promise<boolean> {
    return bcrypt.compare(password, storedPasswordHash);
  }
  
  async validateUser(email: string) {
    const user = await this.userService.findOUserByEmail(email)
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
