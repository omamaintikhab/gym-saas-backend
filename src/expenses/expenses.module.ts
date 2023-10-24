import { Module } from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { ExpensesController } from './expenses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Business } from 'src/business/entities/business.entity';
import { User } from 'src/user/entities/user.entities';
import { Expenses } from './entities/expense.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Business, User, Expenses])],
  controllers: [ExpensesController],
  providers: [ExpensesService],
})
export class ExpensesModule {}
