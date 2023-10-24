import { Expenses } from 'src/expenses/entities/expense.entity';
import { User } from '../../user/entities/user.entities';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Income } from 'src/income/entities/income.entity';


@Entity()
export class Business {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  business_name: string;

  @OneToMany(() => User, user => user.business)
  users: User[];

  @OneToMany(() => Expenses, expenses => expenses.business)
  expenses: Expenses[];

  @OneToMany(() => Income, income => income.business)
  income: Income[];
}