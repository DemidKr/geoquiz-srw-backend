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
import {ResultService} from "./result.service";
import {CreateResultDto} from "./dto/create-result.dto";
import {UpdateQuestionDto} from "../questions/dto/update-question.dto";
import {UpdateResultDto} from "./dto/update-result.dto";

@Controller('result')
export class ResultController {
    constructor(
        private resultService: ResultService,
        private authService: AuthService,
    ) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    async getAllResults(@Req() req, @Res() res) {
        const results = await this.resultService.findAll();
        return res.send(results);
    }

    @UseGuards(JWTGuard)
    @Get('/user')
    @HttpCode(HttpStatus.OK)
    async getAllUserQuestionsResults(@Req() req, @Res() res) {
        const token = req.token;

        const user = await this.authService.getUserByTokenData(token);
        const userResults = await this.resultService.findUserResult(user.id);
        return res.send(userResults);
    }

    @Get('/question/:id')
    @HttpCode(HttpStatus.OK)
    async getAllQuestionsResults(@Param('id') id: number, @Res() res) {
        const questionResults = await this.resultService.findQuestionResult(id);

        return res.send(questionResults);
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async getResult(@Param('id') id: number) {
        return await this.resultService.findOne(id);
    }

    @UseGuards(JWTGuard)
    @Post()
    @HttpCode(HttpStatus.OK)
    async createResult(
        @Body() createResultDto: CreateResultDto,
        @Req() req,
    ) {
        const user = await this.authService.getUserByTokenData(req.token);

        return await this.resultService.create({
            ...createResultDto,
            userId: user.id,
        });
    }

    @UseGuards(JWTGuard)
    @Put(':id')
    @HttpCode(HttpStatus.OK)
    async updateResult(
        @Body() updateResultDto: UpdateResultDto,
        @Param('id') id: number,
        @Req() req,
    ) {
        return await this.resultService.update(
            id,
            updateResultDto
        );
    }

    @UseGuards(JWTGuard)
    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    async deleteResult(@Param('id') id: number) {
        return await this.resultService.delete(id);
    }
}
