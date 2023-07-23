import { UserRoleEnum } from '../enums/user.role.enum';

export class User {
  id: number;
  uuid: string;
  username?: string;
  password: string;
  role: UserRoleEnum;
}
