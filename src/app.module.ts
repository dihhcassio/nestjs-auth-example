import { Module } from '@nestjs/common';
import { AppController } from './application/controllers/app.controller';
import { AppService } from './domain/services/app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './infrastructure/mysql/repositories/user.repository';
import { AuthService } from './domain/services/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { UserEntity } from './infrastructure/mysql/entities/user.entity';
import { AuthController } from './application/controllers/auth.controller';
import { UserController } from './application/controllers/user.controller';
import { UserService } from './domain/services/user.service';
import { JwtStrategy } from './application/controllers/security/strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    {
      ...JwtModule.register({
        secret: jwtConstants.secret,
        signOptions: { expiresIn: '1d' },
      }),
      global: true,
    },
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        entities: ['dist/**/*.entity.js'],
        synchronize: true,
        logging: true,
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([UserEntity]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [AppController, AuthController, UserController],
  providers: [
    JwtStrategy,
    AppService,
    { provide: 'IAuthService', useClass: AuthService },
    { provide: 'IUserRepository', useClass: UserRepository },
    { provide: 'IUserService', useClass: UserService },
  ],
})
export class AppModule {}
