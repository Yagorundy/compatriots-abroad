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

    async createUser(user: UserCreateDto) {
        const location = await this.geocodingService.getLocation(user.address)
        const passwordHash = hashSync(user.password)

        await this.userRepository.create({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            passwordHash,
            countryOfOrigin: user.countryOfOrigin,
            address: user.address,
            country: location.country,
            lat: location.lat,
            lng: location.lng
        })
    }

    async getUsersLocation(countryOfOriginCode: string) {
        return await this.userRepository.getUsersLocation(countryOfOriginCode)
    }
}
