import {
  Body,
  Controller, Get, HttpCode,
  HttpStatus,
  Post, Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthService } from './auth.service';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { LoginGuard } from './guards/login.guard';
import { RegistrationGuard } from './guards/registration.guard';
import { RefreshJWTGuard } from './guards/refresh-jwt.guard';
import {JWTGuard} from "./guards/jwt.guard";
import {RolesService} from "../roles/roles.service";

@Controller('auth')
export class AuthController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
    private roleService: RolesService,
  ) {}

  @UseGuards(LoginGuard)
  @Post('login')
  async loginUser(@Body() loginUserDto: LoginUserDto, @Res() res: Response) {
    const user = await this.usersService.login(loginUserDto);

    const access = await this.authService.generateAccessToken(user);
    const refresh = await this.authService.generateRefreshToken(
      user.id as number,
    );

    res.statusCode = HttpStatus.OK;
    return res.send({ ...access, ...refresh, username: user.username, role: user.role });
  }

  @UseGuards(RegistrationGuard)
  @Post('registration')
  async registrationUser(
    @Body() createUserDto: CreateUserDto,
    @Res() res: Response,
  ) {
    const user = await this.usersService.registration(createUserDto);

    const access = await this.authService.generateAccessToken(user);
    const refresh = await this.authService.generateRefreshToken(
      user.id as number,
    );

    const role = await this.roleService.findOne(user.roleId)

    res.statusCode = HttpStatus.CREATED;
    return res.send({ ...access, ...refresh, username: user.username, role });
  }

  @UseGuards(RefreshJWTGuard)
  @Post('refresh')
  async refreshToken(
    @Body() refreshTokenDto: RefreshTokenDto,
    @Res() res: Response,
  ) {
    const validToken = this.authService.verifyToken(
      refreshTokenDto.refresh_token,
    );
    const user = await this.usersService.findOne(refreshTokenDto.username);
    const access = await this.authService.generateAccessToken(user);

    if (validToken?.error) {
      if (validToken?.error === 'jwt expired') {
        const refresh = await this.authService.generateRefreshToken(user.id);

        res.statusCode = HttpStatus.OK;
        return res.send({ ...access, ...refresh });
      } else {
        res.statusCode = HttpStatus.BAD_REQUEST;
        return res.send({ error: validToken?.error });
      }
    } else {
      res.statusCode = HttpStatus.OK;
      return res.send({
        ...access,
        refresh_token: refreshTokenDto.refresh_token,
      });
    }
  }
  @UseGuards(JWTGuard)
  @Get('verify')
  @HttpCode(HttpStatus.OK)
  async verify(@Req() req, @Res() res) {
    const token = req.token;

    const user = await this.authService.getUserByTokenData(token);

    return res.send({username: user.username, role: user.role});
  }
}
