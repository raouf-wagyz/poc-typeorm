import path from 'path';

import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';

import {SnakeNamingStrategy} from "typeorm-naming-strategies";
import {setupDataSource} from "../../db/test-containers/setup-test-containers";

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useFactory: async () => {
                console.info('setup database start ...');
                const pg = await setupDataSource();
                console.info('setup database completed');
                return {
                    name: 'default',
                    type: 'postgres',
                    url: pg.getConnectionUri(),
                    schema: 'typeorm',
                    entities: [path.join(__dirname, '/../../db/entities/**/*')],
                    synchronize: false,
                    migrations: [path.join(__dirname, '/../../db/migrations/**/*')],
                    migrationsTableName: 'migrations_typeorm',
                    migrationsRun: true,
                    migrationsTransactionMode: 'each',
                    namingStrategy: new SnakeNamingStrategy(),
                    logging: true,
                };
            },
        }),
    ],
})
export class DatabaseProviderModule {}
