import { Business } from 'src/business/entities/business.entity';
import { User } from 'src/user/entities/user.entities';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';

@Entity()
export class Expenses {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'double' })
  amount: number;

  @Column({ type: 'varchar', length: 500 })
  description: string;

  @ManyToOne(() => Business, business => business.expenses, { nullable: false })
  business: Business;

  @ManyToOne(() => User, user => user.expenses, { nullable: false })
  created_by_user: User;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}