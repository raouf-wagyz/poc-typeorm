import {Module} from '@nestjs/common';
import {ApiModule} from '@controller/api.module';
import {DatabaseProviderModule} from './providers/db/database.provider';

@Module({
  imports: [
    ApiModule,
    DatabaseProviderModule,
  ],
})
export class AppModule {}
