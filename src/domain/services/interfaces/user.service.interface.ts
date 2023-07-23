import { User } from 'src/domain/model/user.model';

export interface IUserService {
  create(user: User): Promise<User>;
  update(user: User): Promise<User>;
  findByUsername(username: string): Promise<User>;
  findById(id: number): Promise<User>;
  remove(id: number): Promise<boolean>;
}
