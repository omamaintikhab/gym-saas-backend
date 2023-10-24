import { Module } from '@nestjs/common';
import { BusinessService } from './business.service';
import { BusinessController } from './business.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Business } from './entities/business.entity';
import { User } from 'src/user/entities/user.entities';
import { Expenses } from 'src/expenses/entities/expense.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Business, User, Expenses])],
  controllers: [BusinessController],
  providers: [BusinessService],
})
export class BusinessModule {}
