import { Module } from '@nestjs/common';

import {CitiesServiceModule} from "@services/cities/cities.service.module";
import {CitiesController} from "@controller/cities/cities.controller";

@Module({
  imports: [CitiesServiceModule],
  controllers: [CitiesController],
})
export class CitiesControllerModule {}
