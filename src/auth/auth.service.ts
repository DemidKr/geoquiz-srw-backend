import {Injectable} from "@nestjs/common";
import {UsersService} from "../users/users.service";
import {User} from "../users/users.model";
import {JwtService} from "@nestjs/jwt";
import {jwtConstants} from "./constants";

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService) {}

    async validateUser(username: string): Promise<User | null> {
        const user = await this.usersService.findOne(username);

        if (!user) {
            return null;
        }

        return user;
    }

    verifyToken(token: string) {
        try {
            return this.jwtService.verify(token)
        } catch (e) {
            return {error: e.message}
        }
    }

    async generateAccessToken(user: User) {
        return {
            access_token: this.jwtService.sign({ user }),
        };
    }

    async generateRefreshToken(userId: number) {
        return {
            refresh_token: this.jwtService.sign(
                { userId },
                {
                    secret: jwtConstants.secret,
                    expiresIn: '30d',
                },
            ),
        };
    }

    parseJwt(token: string) {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split('')
                .map(function (c) {
                    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                })
                .join(''),
        );
        return JSON.parse(jsonPayload);
    }

    async getUserByTokenData(token: string): Promise<User> {
        const parsedTokenData = this.parseJwt(token);

        return await this.usersService.findOne(parsedTokenData.user.username);
    }
}