import {Module} from '@nestjs/common';
import {CitiesControllerModule} from "@controller/cities/cities.controller.module";


@Module({
  imports: [
    CitiesControllerModule,
  ],
})
export class ApiModule {}
