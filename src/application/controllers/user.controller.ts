import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UniqueException } from 'src/infrastructure/mysql/exceptions/unique.exceptions';
import { EntityNotFoundError } from 'typeorm';
import { IUserService } from 'src/domain/services/interfaces/user.service.interface';
import { User } from 'src/domain/model/user.model';
import { CreateUserDto } from 'src/domain/dtos/user/create.user.dto';
import { UpdateUserDto } from 'src/domain/dtos/user/update.user.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(
    @Inject('IUserService')
    private readonly userService: IUserService,
  ) {}

  @ApiResponse({ status: 201, type: User })
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    const user = { ...createUserDto, id: null } as User;
    return this.userService.create(user).catch((error) => {
      if (error instanceof UniqueException) {
        throw new HttpException(
          'User with that username/email already exists',
          501,
        );
      }
      return null;
    });
  }

  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard())
  @ApiBearerAuth('JWT-auth')
  @Put()
  async update(@Body() updateUserDto: UpdateUserDto) {
    const user = { ...updateUserDto, id: null } as User;
    return this.userService.update(user).catch((error) => {
      if (error instanceof UniqueException) {
        throw new HttpException(
          'User with that username/email already exists',
          501,
        );
      }
      return null;
    });
  }

  @ApiQuery({ name: 'id', type: 'string' })
  @UseGuards(AuthGuard())
  @ApiBearerAuth('JWT-auth')
  @ApiResponse({ status: 200, type: User })
  @Get()
  async findOne(@Query('id') id: number): Promise<User> {
    try {
      return await this.userService.findById(id);
    } catch (error) {
      if (error instanceof EntityNotFoundError)
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
