import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
    constructor(
        private userRepository: UserRepository,
        private jwtService : JwtService
        ) {}

    async signUp(authCredentialsDto: AuthCredentialsDto) {
        return await this.userRepository.createUser(authCredentialsDto)
    }

    async signIn(authCredentialsDto: AuthCredentialsDto) {
        const {username, password} = authCredentialsDto
        const user = await this.userRepository.findOne({where: {username}})

        if (user && (await bcrypt.compare(password, user.password))) {
            // 유저 토큰 생성 (secret, payload)
            const payload = { username }
            const accessToken = await this.jwtService.sign(payload)
            
            return { accessToken}
        } else {
            throw new UnauthorizedException('login failed')
        }
    }
}
