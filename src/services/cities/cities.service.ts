import {Injectable} from '@nestjs/common';
import {CitiesRepository} from '@repositories/cities/cities.repository';
import {City} from "@entities/City";

@Injectable()
export class CitiesService {
  constructor(protected readonly repository: CitiesRepository ) {}

  async findCity(): Promise<City | null> {
    return this.repository.findCity();
  }

}
