import { Body, Controller, Post, UsePipes, ValidationPipe, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get-user.decorator';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('signup')
    @UsePipes(ValidationPipe)
    signUp(@Body() authCredentialsDto: AuthCredentialsDto) {
        return this.authService.signUp(authCredentialsDto)
    }

    @Post('signIn')
    @UsePipes(ValidationPipe)
    signIn(@Body() AuthCredentialsDto: AuthCredentialsDto) {
        return this.authService.signIn(AuthCredentialsDto)
    }

    // @Post('/auth')
    // @UseGuards(AuthGuard())
    // getUser(@GetUser() user: User) {
    //     console.log('user', user)
    // }
}
