import { Inject, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { IAuthService } from './interfaces/auth.service.interface';
import { IUserRepository } from '../repositories/user.repository.interface';
import { JwtPayload } from 'src/application/controllers/security/strategies/jwt-payload';

@Injectable()
export class AuthService implements IAuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    @Inject('IUserRepository')
    private readonly usersRepository: IUserRepository,
    private jwtService: JwtService,
  ) {}

  async validateUser(uuid: string): Promise<any> {
    const user = await this.usersRepository.findByUuid(uuid);
    if (user)
      return {
        uuid: user.uuid,
        username: user.username,
      };
    else return null;
  }

  async login(username: string, password: string): Promise<any> {
    try {
      const user = await this.usersRepository.findByUsername(username);
      if (bcrypt.compareSync(password, user?.password)) {
        const payload = {
          username: user.username,
          sub: user.uuid,
        } as JwtPayload;
        return {
          access_token: this.jwtService.sign(payload),
          expires: this.addOneDay(),
        };
      }
      return null;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  validateToken(jwt: string): any {
    return this.jwtService.verify(jwt);
  }

  addOneDay(date = new Date()) {
    date.setDate(date.getDate() + 1);
    return date;
  }
}
