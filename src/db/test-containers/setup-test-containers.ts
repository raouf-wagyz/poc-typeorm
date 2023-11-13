import { PostgreSqlContainer } from "@testcontainers/postgresql";
import { StartedPostgreSqlContainer } from "@testcontainers/postgresql/build/postgresql-container";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";
import { DataSource } from "typeorm";

export const DATABASE_SCHEMA = "typeorm";
export async function setupDataSource(): Promise<StartedPostgreSqlContainer> {
  const pg = await new PostgreSqlContainer("postgres:14.2-alpine")
      .withDatabase("postgres")
      .withUsername("postgres")
      .withPassword("postgres")
      .withExposedPorts(5432)
      .withReuse()
      .start();

  console.log(pg.getConnectionUri());
  const config: PostgresConnectionOptions = {
    name: "default",
    type: "postgres",
    host: "localhost",
    username: pg.getUsername(),
    password: pg.getPassword(),
    database: pg.getDatabase(),
    port: pg.getPort(),
    schema: DATABASE_SCHEMA,
  };

  const dataSource = new DataSource(config);
  await dataSource.initialize();
  await dataSource.query(`CREATE SCHEMA IF NOT EXISTS ${DATABASE_SCHEMA}`);

  return pg;
}
