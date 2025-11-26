import { Controller, Post, Body, Get, Headers } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private service: AuthService) {}

  @Post('register')
  register(@Body() body: any) {
    return this.service.register(body.name, body.email, body.password);
  }

  @Post('login')
  login(@Body() body: any) {
    return this.service.login(body.email, body.password);
  }

  @Get('me')
  me(@Headers('authorization') auth: string) {
    const token = auth?.replace('Bearer ', '');
    return this.service.me(token);
  }
}
