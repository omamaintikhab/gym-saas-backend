import { Module } from '@nestjs/common';
import { IncomeService } from './income.service';
import { IncomeController } from './income.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Business } from 'src/business/entities/business.entity';
import { Expenses } from 'src/expenses/entities/expense.entity';
import { User } from 'src/user/entities/user.entities';

@Module({
  imports: [TypeOrmModule.forFeature([Business, User, Expenses])],
  controllers: [IncomeController],
  providers: [IncomeService],
})
export class IncomeModule {}
