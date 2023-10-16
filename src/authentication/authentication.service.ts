import { Injectable, UnauthorizedException,  HttpException, HttpStatus  } from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { UpdateAuthenticationDto } from './dto/update-authentication.dto';
import { UserService } from 'src/user/user.service';
import { HashService } from './hashPassword';
import { QueryFailedError } from 'typeorm';
import { DUPLICATE_DATABASE_RECORD, ER_DUP_ENTRY } from 'src/constants/constants';

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
        throw new HttpException(DUPLICATE_DATABASE_RECORD, HttpStatus.CONFLICT);
      }
      throw new HttpException('Database error: Query failed', HttpStatus.BAD_REQUEST);
    }
  }
  }

  findAll() {
    return `This action returns all authentication`;
  }

  findOne(id: number) {
    return `This action returns a #${id} authentication`;
  }

  update(id: number, updateAuthenticationDto: UpdateAuthenticationDto) {
    return `This action updates a #${id} authentication`;
  }

  remove(id: number) {
    return `This action removes a #${id} authentication`;
  }
  async validateUser(id: number) {
    const user = await this.userService.findOneById(id)
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
