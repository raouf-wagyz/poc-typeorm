import {Module} from '@nestjs/common';

import {CitiesService} from './cities.service';
import {CitiesRepositoryModule} from "@repositories/cities/cities.repository.module";

@Module({
  imports: [
    CitiesRepositoryModule,
  ],
  exports: [CitiesService],
  providers: [CitiesService],
})
export class CitiesServiceModule {}
