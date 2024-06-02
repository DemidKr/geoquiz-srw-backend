import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Post, Put,
    Req,
    Res,
    UseGuards,
} from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { JWTGuard } from '../auth/guards/jwt.guard';
import {StarsService} from "./stars.service";
import {CreateStarsDto} from "./dto/create-stars.dto";
import {UpdateStarsDto} from "./dto/update-stars.dto";

@Controller('stars')
export class StarsController {
    constructor(
        private starsService: StarsService,
        private authService: AuthService,
    ) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    async getAllStars(@Req() req, @Res() res) {
        const stars = await this.starsService.findAll();
        return res.send(stars);
    }

    // @Get('/question/:id')
    // @HttpCode(HttpStatus.OK)
    // async getQuestionAverageStars(@Param('id') id: number) {
    //     return await this.starsService.findQuestionAverageStars(id);
    // }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async getStars(@Param('id') id: number) {
        return await this.starsService.findOne(id);
    }

    @UseGuards(JWTGuard)
    @Get('question/:id')
    @HttpCode(HttpStatus.OK)
    async getQuestionStars(@Req() req, @Param('id') id: number) {
        const token = req.token;

        const user = await this.authService.getUserByTokenData(token);

        return await this.starsService.findUserOneInQuestion({userId: user.id, questionId: id});
    }

    @UseGuards(JWTGuard)
    @Post()
    @HttpCode(HttpStatus.OK)
    async createStars(
        @Body() createStarsDto: CreateStarsDto,
        @Req() req,
    ) {
        const user = await this.authService.getUserByTokenData(req.token);

        return await this.starsService.create({
            ...createStarsDto,
            userId: user.id,
        });
    }

    @UseGuards(JWTGuard)
    @Put(':id')
    @HttpCode(HttpStatus.OK)
    async updateStars(
        @Body() updateStarsDto: UpdateStarsDto,
        @Param('id') id: number,
        @Req() req,
    ) {
        return await this.starsService.update(
            id,
            updateStarsDto
        );
    }

    @UseGuards(JWTGuard)
    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    async deleteStars(@Param('id') id: number) {
        return await this.starsService.delete(id);
    }
}
