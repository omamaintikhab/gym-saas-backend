import { PartialType } from '@nestjs/mapped-types';
import { SignupDto } from './signup.dto';

export class UpdateAuthenticationDto extends PartialType(SignupDto) {}
