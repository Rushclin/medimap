import {
  Injectable,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
// import { ConfigService } from '@nestjs/config';
import { LoginUserDto } from 'src/dto';
import { UsersService } from '../users/service';
import { User } from '@prisma/client';
import { RegisterUserDto } from 'src/dto/auth.dto';
import { TokensService } from 'src/providers/tokens/tokens.service';
import { LOGIN_ACCESS_TOKEN } from 'src/providers/tokens/tokens.constants';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    // private jwtService: JwtService,
    private tokeService: TokensService,
    // private mailService: MailService,
    // private configService: ConfigService,
  ) {}

  async validateUser(
    email: string,
    pass: string,
  ): Promise<Omit<User, 'password'>> {
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isMatch = await this.compare(pass, user.password);
    if (!isMatch) throw new UnauthorizedException('Invalid credentials');

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user;
    return result;
  }

  async compare(pass: string, uPass: string): Promise<boolean> {
    if (!pass || !uPass) {
      return false;
    }

    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      return await bcrypt.compare(pass, uPass);
    } catch (error) {
      console.error('Password comparison error:', error);
      return false;
    }
  }

  async register(registerUserDto: RegisterUserDto) {
    const createdUser = await this.usersService.create({
      ...registerUserDto,
      latitude: 0,
      longitude: 0,
    });

    if (!createdUser) {
      throw new InternalServerErrorException(
        'Une erreur est survenue lors de la creation',
      );
    }

    // Fetch the full user entity to ensure all required fields are present
    const user = await this.usersService.findByEmail(createdUser.email);
if(!user){
  throw new UnauthorizedException('Invalid credentials');
}
    // Send welcome email
    // await this.mailService.sendUserWelcome(user);

    return this.generateTokens(user);
  }

  async login(loginUserDto: LoginUserDto) {
    const user = await this.validateUser(
      loginUserDto.email,
      loginUserDto.password,
    );
    return this.generateTokens(user);
  }

  // async logout(userId: string) {
  //   await this.usersService.update(userId, { refreshToken: null });
  // }

  // async refreshTokens(userId: string, refreshToken: string) {
  //   const user = await this.usersService.findById(userId);
  //   if (!user?.refreshToken) throw new UnauthorizedException();

  //   const isMatch = await bcrypt.compare(refreshToken, user.refreshToken);
  //   if (!isMatch) throw new UnauthorizedException();

  //   return this.generateTokens(user);
  // }

  // async sendPasswordResetEmail(email: string) {
  //   const user = await this.usersService.findByEmail(email);
  //   if (!user) throw new NotFoundException('User not found');

  //   const resetToken = uuidv4();
  //   const expiresAt = new Date(Date.now() + 3600000); // 1 hour

  //   await this.usersService.update(user.id, {
  //     resetPasswordToken: resetToken,
  //     resetPasswordExpires: expiresAt,
  //   });

  //   await this.mailService.sendPasswordResetLink(user, resetToken);
  // }

  // async resetPassword(token: string, newPassword: string) {
  //   const user = await this.usersService.findByResetToken(token);
  //   if (!user || user.resetPasswordExpires < new Date()) {
  //     throw new BadRequestException('Invalid or expired token');
  //   }

  //   const hashedPassword = await bcrypt.hash(newPassword, 10);
  //   await this.usersService.update(user.id, {
  //     password: hashedPassword,
  //     resetPasswordToken: null,
  //     resetPasswordExpires: null,
  //   });
  // }

  private generateTokens(user: Omit<User, 'password'>) {
    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
      user: user,
    };

    const accessToken = this.tokeService.signJwt(LOGIN_ACCESS_TOKEN, payload);
    const refreshToken = this.tokeService.signJwt(LOGIN_ACCESS_TOKEN, {
      // secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      // expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRATION'),
    });

    // await this.usersService.update(user.id, {
    //   refreshToken: await bcrypt.hash(refreshToken, 10),
    // });

    return { accessToken, refreshToken, user, token: accessToken };
  }
}
