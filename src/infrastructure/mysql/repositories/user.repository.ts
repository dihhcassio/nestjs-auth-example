import { Injectable } from '@nestjs/common';
import { UserEntity } from '../entities/user.entity';
import { IUserRepository } from 'src/domain/repositories/user.repository.interface';
import { User } from 'src/domain/model/user.model';
import { UniqueException } from '../exceptions/unique.exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
  ) {}

  async createUser(user: User): Promise<User> {
    const newUser = this.repository.create(user);
    return await this.repository.save(newUser).catch((error) => {
      if (error.code === 'ER_DUP_ENTRY') throw new UniqueException();
      throw error;
    });
  }

  async findAndUpdate(user: User): Promise<User> {
    const updateUser = await this.findById(user.id);
    if (user?.username) updateUser.username = user.username;
    if (user?.password) updateUser.password = user.password;
    return this.repository.save(updateUser).catch((error) => {
      if (error.code === 'ER_DUP_ENTRY') throw new UniqueException();
      throw error;
    });
  }

  async findByUsername(username: string): Promise<User> {
    return await this.repository.findOneOrFail({
      where: { username: username },
    });
  }

  async findById(id: number): Promise<User> {
    return await this.repository.findOneOrFail({ where: { id: id } });
  }

  async updateToRemoved(id: number): Promise<boolean> {
    const entity = (await this.findById(id)) as UserEntity;
    if (!entity) return false;
    entity.removed = true;
    await this.repository.save(entity);
    return true;
  }

  async findByUuid(uuid: string): Promise<User> {
    return await this.repository.findOneOrFail({ where: { uuid: uuid } });
  }
}
