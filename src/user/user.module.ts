import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import {User} from './entities/user.entities'
import { Business } from 'src/business/entities/business.entity';
import { Expenses } from 'src/expenses/entities/expense.entity';
import { Income } from 'src/income/entities/income.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Business, Income, Expenses])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
