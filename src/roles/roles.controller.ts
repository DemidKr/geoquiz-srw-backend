import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Post,
    Req,
    Res,
} from '@nestjs/common';
import {RolesService} from "./roles.service";
import {CreateRoleDto} from "./dto/create-role.dto";

@Controller('role')
export class RolesController {
    constructor(private rolesService: RolesService) {}

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
