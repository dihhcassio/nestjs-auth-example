import { Inject, Injectable } from '@nestjs/common';
import { IUserService } from './interfaces/user.service.interface';
import { User } from '../model/user.model';
import { IUserRepository } from '../repositories/user.repository.interface';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @Inject('IUserRepository')
    private readonly usersRepository: IUserRepository,
  ) {}

  async create(user: User): Promise<User> {
    return await this.usersRepository.createUser(user);
  }

  async update(user: User): Promise<User> {
    return await this.usersRepository.findAndUpdate(user);
  }

  async findByUsername(username: string): Promise<User> {
    return await this.usersRepository.findByUsername(username);
  }

  async findById(id: number): Promise<User> {
    return await this.usersRepository.findById(id);
  }

  async remove(id: number): Promise<boolean> {
    return await this.usersRepository.updateToRemoved(id);
  }
}
