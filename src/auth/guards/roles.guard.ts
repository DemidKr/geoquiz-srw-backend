import {Injectable, CanActivate, ExecutionContext, UnauthorizedException, SetMetadata} from '@nestjs/common';
import {Observable} from "rxjs";
import {AuthService} from "../auth.service";
import {Reflector} from "@nestjs/core";

export const Roles = (...roles: string[]) => SetMetadata('roles', roles);

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private authService: AuthService,
        private readonly reflector: Reflector
    ) {}

    async canActivate(
        context: ExecutionContext,
        // @ts-ignore
    ): boolean | Promise<boolean> | Observable<boolean> {
        const roles = this.reflector.get<string[]>('roles', context.getHandler());
        if (!roles) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const token = request.token

        if (!token) {
            throw new UnauthorizedException('Ошибка авторизации');
        }

        const user = await this.authService.getUserByTokenData(request.token);
        const userRole = user.role.name;

        if(!roles.some(r => r === userRole)) {
            throw new UnauthorizedException('Недостаточно прав');
        }

        return true;
    }
}