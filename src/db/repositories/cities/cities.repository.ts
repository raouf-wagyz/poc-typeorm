import {Injectable} from '@nestjs/common';
import {DataSource, Like, Not, Repository} from 'typeorm';


import {City} from "@entities/City";

@Injectable()
export class CitiesRepository extends Repository<City> {
  constructor(dataSource: DataSource) {
    super(City, dataSource.createEntityManager());
  }


  findCity(): Promise<City | null> {
    return this.findOne({
      where: {
        country: {
          continent: { id: 'EU' },
          name: Like('F%'),
          id: Not('FR')
        },
      },
      order: { country: { name: 'DESC' } },
    });
  }
}
