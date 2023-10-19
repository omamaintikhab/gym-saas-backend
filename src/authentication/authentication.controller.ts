import { Controller, Post, Body } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { LoginDto, SignupDto } from './dto/signup.dto';
import { UpdateAuthenticationDto } from './dto/update-authentication.dto';
import { LoginResponse } from './types';

@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('signup')
  async signUp(@Body() signupDto: SignupDto): Promise<any> {
    console.log('in the signup', signupDto)
    return this.authenticationService.signup(signupDto);
  }

  @Post('login')
  async loginUser(@Body() loginDto: LoginDto): Promise<LoginResponse> {
    console.log('in the login', loginDto)
    return this.authenticationService.login(loginDto);
  }
}
