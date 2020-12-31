import { Injectable } from "@nestjs/common";
import { hashSync } from "bcryptjs";
import { UserRepository } from "../../infrastructure/mongo/users/user.repository";
import { CreateUserDto } from "./dtos/create-user.dto";

@Injectable()
export class UsersService {
  constructor(private userRepository: UserRepository) { }

  async createUser(user: CreateUserDto) {
    // TODO
    await this.userRepository.createUser({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      passwordHash: hashSync(user.password),
      address: user.address,
      country: '',
      countryOfOrigin: '',
      lat: 0,
      lng: 0,
    })
  }
}
