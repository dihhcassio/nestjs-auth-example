import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Inject,
  Logger,
  Post,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { IAuthService } from 'src/domain/services/interfaces/auth.service.interface';
import { EntityNotFoundException } from '../exceptions/entity-not-found.exception';
import { AuthUserDto } from 'src/domain/dtos/user/auth.user.dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(@Inject('IAuthService') private authService: IAuthService) {}

  @Post()
  @ApiBody({ type: AuthUserDto, required: true })
  async login(@Body() user: any) {
    try {
      const jwtToken = await this.authService.login(
        user.username,
        user.password,
      );
      this.logger.debug(jwtToken);
      if (!jwtToken)
        throw new EntityNotFoundException('username or password are incorrect');
      return jwtToken;
    } catch (error) {
      if (error instanceof EntityNotFoundException)
        throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
