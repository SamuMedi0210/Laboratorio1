import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { ManagerError } from 'src/common/errors/manager.error';
import { ResponseAllUsers } from './interfaces/response-users.interface';
import { PaginationDto } from '../common/dtos/pagination/pagination.dto';
import { UserRole } from 'src/common/enum/roles/userRole';



@Injectable()
export class UserService {

  private users: UserEntity[] = [
    { id: 1, name: 'User1', age: 18, email:'email1', password:'password1' , role:'user' ,gender: 'male', isActive: true },
  ]

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    
    const user: UserEntity = {
      id: this.users.length,
      ...createUserDto,
      isActive: true,
      role: UserRole.USER,
    }
    try {
      this.users.push(user);

      return user;
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }

  async findAll(paginationDto: PaginationDto): Promise<ResponseAllUsers> {
    const { limit, page } = paginationDto;
    const skip = (page - 1) * limit;

    try {
      if (this.users.length === 0) {
        throw new ManagerError({
          type: 'NOT_FOUND',
          message: 'Users not found!',
        })
      }

      const total = this.users.filter((user) => user.isActive === true).length;
      const lastPage = Math.ceil(total / limit);
      const data = this.users.filter((user) => user.isActive === true).slice(skip, limit);
      

      return {
        page,
        limit,
        lastPage,
        total,
        data
      };
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }

  async findOne(id: number): Promise<UserEntity> {
    try {
      const user = this.users.find((user) => user.id === id && user.isActive === true);
      if (!user) {
        throw new ManagerError({
          type: 'NOT_FOUND',
          message: "User not found",
        })
      }

      return user;
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const indexUser = this.users.findIndex((user) => user.id === id && user.isActive === true);
      if (indexUser === -1) {
        throw new ManagerError({
          type: 'NOT_FOUND',
          message: 'User not found',
        });
      }

      this.users[indexUser] = {
        ...this.users[indexUser],
        ...updateUserDto,
      }
      return this.users[indexUser]
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }

  async remove(id: number): Promise<UserEntity> {
    try {
      const indexUser = this.users.findIndex((user) => user.id === id && user.isActive === true);
      if (indexUser === -1) {
        throw new ManagerError({
          type: 'NOT_FOUND',
          message: 'User not found',
        });
      }

      this.users[indexUser] = {
        ...this.users[indexUser],
        isActive: false,
      }

      return this.users[indexUser]
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }
}
