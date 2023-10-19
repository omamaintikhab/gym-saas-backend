// signup.dto.ts
import { IsEmail, IsString, IsIn, IsEnum, IsNotEmpty, IsAlphanumeric } from 'class-validator';
import { UserType } from 'src/user/entities/user.entities';

export class SignupDto {

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsAlphanumeric()
  password: string;
  
  @IsNotEmpty()
  @IsEmail()
  email: string;
  
  @IsNotEmpty()
  @IsString()
  @IsEnum(UserType) // Specify the specific roles allowed
  role: UserType;
}

export class LoginDto {
  @IsNotEmpty()
  @IsString()
  @IsAlphanumeric()
  password: string;
  
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
