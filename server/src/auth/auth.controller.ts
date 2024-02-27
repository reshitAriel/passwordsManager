import { Body, Controller, HttpCode, HttpStatus, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from 'src/entities/user.entity';
import { Response } from 'express';
import { Public } from './decorators/public.decorator';
import { SIGN_IN_EXPIRATION } from './constants/sign-in-expiration.const';

@Controller('api/auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('login')
    async login(@Body() signInDto: Record<string, any>, @Res() res: Response) {
        const token = await this.authService.login(signInDto.username, signInDto.password);
        res.cookie('access_token', token, { maxAge: SIGN_IN_EXPIRATION * 1000 * 60 });
        res.send();
    }

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('register')
    async register(@Body() registerDto: User, @Res() res: Response) {
        const token = await this.authService.register(registerDto);
        res.cookie('access_token', token, { maxAge: SIGN_IN_EXPIRATION * 1000 * 60 });
        res.send();
    }
}
