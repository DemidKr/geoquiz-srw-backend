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
import { JWTGuard } from '../auth/guards/jwt.guard';
import {CoordinatesService} from "./coordinates.service";
import { CreateCoordinatesDto, CreateOneCoordinatesDto } from './dto/create-coordinates.dto';
import {UpdateCoordinatesDto} from "./dto/update-coordinates.dto";

@Controller('coordinates')
export class CoordinatesController {
    constructor(
        private coordinatesService: CoordinatesService,
    ) {}

    @UseGuards(JWTGuard)
    @Get()
    @HttpCode(HttpStatus.OK)
    async getAllCoordinates(@Req() req, @Res() res) {
        const coordinates = await this.coordinatesService.findAll();
        return res.send(coordinates);
    }


    @Get('question/:id')
    @HttpCode(HttpStatus.OK)
    async getAllQuestionCoordinates(@Param('id') id: number) {
        return  await this.coordinatesService.findAllFromQuestion(id);
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async getCoordinates(@Param('id') id: number) {
        return await this.coordinatesService.findOne(id);
    }

    @UseGuards(JWTGuard)
    @Post()
    @HttpCode(HttpStatus.OK)
    async createCoordinates(
        @Body() createCoordinatesDto: CreateCoordinatesDto,
        @Req() req,
    ) {
        return await this.coordinatesService.create(createCoordinatesDto);
    }

    @UseGuards(JWTGuard)
    @Post('/one')
    @HttpCode(HttpStatus.OK)
    async createOneCoordinates(
      @Body() createCoordinatesDto: CreateOneCoordinatesDto,
      @Req() req,
    ) {
        return await this.coordinatesService.createOne(createCoordinatesDto);
    }

    @UseGuards(JWTGuard)
    @Put(':id')
    @HttpCode(HttpStatus.OK)
    async updateCoordinates(
        @Body() updateCoordinatesDto: UpdateCoordinatesDto,
        @Param('id') id: number,
        @Req() req,
    ) {
        return await this.coordinatesService.update(
            id,
            updateCoordinatesDto
        );
    }

    @UseGuards(JWTGuard)
    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    async deleteCoordinates(@Param('id') id: number) {
        return await this.coordinatesService.delete(id);
    }
}
