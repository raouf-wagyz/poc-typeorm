import {Controller, Get,} from '@nestjs/common';
import {ApiQuery, ApiTags} from '@nestjs/swagger';
import {CitiesService} from "@services/cities/cities.service";

@ApiTags('Cities')
@Controller('api/cities')
export class CitiesController {
  constructor(
    private readonly citiesService: CitiesService,
  ) {}

  @Get('find')
  async find() {
    return this.citiesService.findCity();
  }

}
