import { Injectable } from '@nestjs/common'
import { hashSync } from 'bcryptjs'
import { GeocodingService } from '../../infrastructure/geocoding/geocoding.service'
import { UserRepository } from '../../infrastructure/mongo/users/user.repository'
import { UserCreateDto } from './dtos/user-create.dto'

@Injectable()
export class UsersService {
    constructor(private userRepository: UserRepository, private geocodingService: GeocodingService) {}

    async checkUser(id: string) {
        return await this.userRepository.check(id);
    }

    async createUser(userCreateDto: UserCreateDto) {
        const location = await this.geocodingService.getLocationByAddress(userCreateDto.address)
        const passwordHash = hashSync(userCreateDto.password)

        await this.userRepository.create({
            firstName: userCreateDto.firstName,
            lastName: userCreateDto.lastName,
            email: userCreateDto.email,
            passwordHash,
            countryOfOrigin: userCreateDto.countryOfOrigin,
            address: userCreateDto.address,
            country: location.countryCode,
            lat: location.lat,
            lng: location.lng
        })
    }

    async getUserLocations(countryOfOriginCode: string) {
        return await this.userRepository.getUserLocations(countryOfOriginCode)
    }
}
