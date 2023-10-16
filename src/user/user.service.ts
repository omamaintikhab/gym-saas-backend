import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>
    ){}
    async fetchAll(): Promise<User[]>{
        return this.userRepository.find();
      }
    async findOneById(id: number): Promise<User>{
        const user = await this.userRepository.findOne({
          where: [{ id }],
        });
        return user;
      }
    async createUser(user: Partial<User>): Promise<User>{
      const newUser = this.userRepository.create(user);
      return this.userRepository.save(newUser);
    }
}
