import { User } from '../model/user.model';

export interface IUserRepository {
  createUser(user: User): Promise<User>;
  findAndUpdate(user: User): Promise<User>;
  findByUsername(username: string): Promise<User>;
  findById(id: number): Promise<User>;
  updateToRemoved(id: number): Promise<boolean>;
  findByUuid(uuid: string): Promise<User>;
}
