import { Controller, Get, Render } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller()
export class AuthRenderController {
    constructor(private readonly authService: AuthService) {}

    @Get('/signin')
    @Render('signin')
    signinPage() {
        return;
    }

    @Get('/signup')
    @Render('signup')
    signupPage() {
        return;
    }
}