import {
    Body,
    Controller,
    Delete, forwardRef,
    Get,
    HttpCode,
    HttpStatus, Inject,
    Param,
    Post,
    Req,
    Res, UseGuards,
} from '@nestjs/common';
import {RolesService} from "./roles.service";
import {CreateRoleDto} from "./dto/create-role.dto";
import {JWTGuard} from "../auth/guards/jwt.guard";
import {Roles, RolesGuard} from "../auth/guards/roles.guard";
import {AuthService} from "../auth/auth.service";

@Controller('role')
export class RolesController {
    constructor(
        @Inject(forwardRef(() => RolesService))
        private rolesService: RolesService,
    ) {}

    @Roles( 'admin')
    @UseGuards(JWTGuard, RolesGuard)
    @Get()
    @HttpCode(HttpStatus.OK)
    async getAllRoles(@Req() req, @Res() res) {
        const roles = await this.rolesService.findAll();
        return res.send(roles);
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async getRole(@Param('id') id: number) {
        return await this.rolesService.findOne(id);
    }

    @Post()
    @HttpCode(HttpStatus.OK)
    async createRole(
        @Body() createRoleDto: CreateRoleDto,
        @Req() req,
    ) {
        return await this.rolesService.create(createRoleDto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    async deleteRole(@Param('id') id: number) {
        return await this.rolesService.delete(id);
    }
}
