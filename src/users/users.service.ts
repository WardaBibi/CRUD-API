import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepository:Repository<User>,
) {}
  create(createUserDto: CreateUserDto) {
  const newUser = this.userRepository.create(createUserDto) // cretae an object ready to beinserted in db
  return this.userRepository.save(newUser) //insert new user in db     //save returns created object and insert returns  query result

  }

  findAll() {
    return this.userRepository.find();   //select * from user
  }

  findOne(id: number) {
    return this.userRepository.findOneBy({ id })
  }

  async update(id: number, updateUserDto: UpdateUserDto) {

    const user = await this.findOne(id)

    return this.userRepository.save({ ...user,...updateUserDto})
 
     
    // -----------------------------------
    // an alternative query is : 
    // return this.userRepository.update(id,updateUserDto)
    //  but the problem is it returns result of query instead of updated user just like insert

  }

  async remove(id: number) {
    const user= await this.findOne(id)
    return this.userRepository.remove(user); 

    // -----------------------------------
    //alternative 
    //  this.userRepository.delete() 
    //  but the problem is it returns result of query instead of deleted user just like insert

  }
}
