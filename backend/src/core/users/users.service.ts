import { InjectMapper } from '@automapper/nestjs'
import { Mapper } from '@automapper/types'
import { Injectable } from '@nestjs/common'
import { hashSync } from 'bcryptjs'
import { IUserCreateDto } from '../../../../common/transfer/users/user-create-dto.interface'
import { IUserProfileDto } from '../../../../common/transfer/users/user-profile-dto.interface'
import { IUserSchema } from '../../data/mongo/user-schema.interface'
import { GeocodingService } from '../../infrastructure/geocoding/geocoding.service'
import { UserRepository } from '../../infrastructure/mongo/users/user.repository'
import { LocationDto } from '../locations/location.dto'
import { UserCreateDto } from './dtos/user-create.dto'
import { UserSchemaDto } from './dtos/user-schema.dto'

@Injectable()
export class UsersService {
    constructor(
        private userRepository: UserRepository,
        private geocodingService: GeocodingService,
        @InjectMapper() private mapper: Mapper
    ) {}

    async checkUser(id: string) {
        return await this.userRepository.userExists(id);
    }

    async createUser(userCreateDto: IUserCreateDto) {
        const location = await this.geocodingService.getLocationByAddress(userCreateDto.address)
        const passwordHash = hashSync(userCreateDto.password)

        // const user: Partial<IUserSchema> = { passwordHash }
        // this.mapper.map(userCreateDto, UserSchemaDto, UserCreateDto, user)
        // this.mapper.map(location, UserSchemaDto, LocationDto, user)
        // await this.userRepository.createUser(user)

        await this.userRepository.createUser({
            passwordHash,
            ...userCreateDto,
            ...location
        })
    }

    async getUserProfile(id: string) {
        return await this.userRepository.getUserProfile(id)
    }

    async updateUserProfile(id: string, userProfileDto: IUserProfileDto) {
        // TODO
    }

    async getUsersCoordinates(countryOfOriginCode: string) {
        return await this.userRepository.getUsersCoordinates(countryOfOriginCode)
    }
}
