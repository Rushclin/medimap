import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { LoginUserDto } from 'src/dto';
import { Response } from 'express';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './service';
import { RegisterUserDto } from 'src/dto/auth.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 201, description: 'User registered successfully' })
  async register(
    @Body() registerUserDto: RegisterUserDto,
    @Res() res: Response,
  ) {
    const user = await this.authService.register(registerUserDto);
    return res.status(HttpStatus.CREATED).json(user);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login user' })
  async login(@Body() loginUserDto: LoginUserDto, @Res() res: Response) {
    const tokens = await this.authService.login(loginUserDto);
    this.setAuthCookies(res, tokens);
    return res.status(HttpStatus.CREATED).json(tokens);
  }

  //   @Post('logout')
  //   @UseGuards(JwtAuthGuard)
  //   @ApiOperation({ summary: 'Logout user' })
  //   async logout(@Req() req: any, @Res() res: Response) {
  //     await this.authService.logout(req.user.id);
  //     this.clearAuthCookies(res);
  //     return res.json({ message: 'Logout successful' });
  //   }

  //   @Post('refresh')
  //   @UseGuards(RefreshAuthGuard)
  //   @ApiOperation({ summary: 'Refresh access token' })
  //   async refresh(@Req() req: any, @Res() res: Response) {
  //     const tokens = await this.authService.refreshTokens(
  //       req.user.id,
  //       req.cookies.refreshToken,
  //     );
  //     this.setAuthCookies(res, tokens);
  //     return res.json({ message: 'Token refreshed successfully' });
  //   }

  //   @Post('forgot-password')
  //   @ApiOperation({ summary: 'Request password reset' })
  //   async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
  //     await this.authService.sendPasswordResetEmail(forgotPasswordDto.email);
  //     return { message: 'Password reset email sent' };
  //   }

  //   @Post('reset-password')
  //   @ApiOperation({ summary: 'Reset user password' })
  //   async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
  //     await this.authService.resetPassword(
  //       resetPasswordDto.token,
  //       resetPasswordDto.newPassword,
  //     );
  //     return { message: 'Password reset successful' };
  //   }

  private setAuthCookies(
    res: Response,
    tokens: { accessToken: string; refreshToken: string },
  ) {
    res.cookie('accessToken', tokens.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 3600000, // 1 hour
    });

    res.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 604800000, // 7 days
    });
  }

  private clearAuthCookies(res: Response) {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
  }
}
