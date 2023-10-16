import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
}