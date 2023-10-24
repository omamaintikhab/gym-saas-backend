import { Expenses } from 'src/expenses/entities/expense.entity';
import { Business } from '../../business/entities/business.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Income } from 'src/income/entities/income.entity';

export enum UserType{
    NORMAL = 'normal user',
    GYMOWNER = 'gym owner',
    TRAINER = 'trianer',
    ADMIN = 'admin',
    STAFF = 'staff'
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  user_name: string;

  @Column({ type: 'varchar', length: 500 })
  password: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  email: string;

  @Column({
    type: 'enum',
    enum: UserType,
    default: UserType.NORMAL, // Set a default role
  })
  user_role: UserType;

  @ManyToOne(() => Business, business => business.users)
  business: Business;

  @OneToMany(() => Expenses, expenses => expenses.created_by_user)
  expenses: Expenses[];

  @OneToMany(() => Income, income => income.created_by_user)
  income: Income[];
}