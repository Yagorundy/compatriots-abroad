import { Injectable } from '@nestjs/common'
import { hashSync } from 'bcryptjs'
import { IUserCreateDto } from '../../../../common/transfer/users/user-create-dto.interface'
import { IUserProfileDto } from '../../../../common/transfer/users/user-profile-dto.interface'
import { GeocodingService } from '../../infrastructure/geocoding/geocoding.service'
import { UserRepository } from '../../infrastructure/mongo/users/user.repository'

@Injectable()
export class UsersService {
    constructor(private userRepository: UserRepository, private geocodingService: GeocodingService) {}

    async checkUser(id: string) {
        return await this.userRepository.userExists(id);
    }

    async createUser(userCreateDto: IUserCreateDto) {
        const location = await this.geocodingService.getLocationByAddress(userCreateDto.address)
        const passwordHash = hashSync(userCreateDto.password)

        await this.userRepository.createUser({
            firstName: userCreateDto.firstName,
            lastName: userCreateDto.lastName,
            email: userCreateDto.email,
            passwordHash,
            countryOfOrigin: userCreateDto.countryOfOrigin,
            address: userCreateDto.address,
            country: location.country,
            lat: location.lat,
            lng: location.lng
        })
    }

    async getUserProfile(id: string) {
        return await this.userRepository.getUserProfile(id)
    }

    async updateUserProfile(id: string, userProfileDto: IUserProfileDto) {
        return await this.userRepository.getUserProfile(id)
    }

    async getUserLocations(countryOfOriginCode: string) {
        return await this.userRepository.getUserLocations(countryOfOriginCode)
    }
}
