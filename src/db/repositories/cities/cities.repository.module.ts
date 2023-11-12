import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CitiesRepository } from './cities.repository';
import {City} from "@entities/City";

@Module({
  imports: [TypeOrmModule.forFeature([City])],
  exports: [TypeOrmModule.forFeature([City]), CitiesRepository],
  providers: [CitiesRepository],
})
export class CitiesRepositoryModule {}
