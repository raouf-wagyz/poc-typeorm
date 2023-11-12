import {MigrationInterface, QueryRunner, Table, TableForeignKey,} from 'typeorm';
import {City} from "@entities/City";

async function createContinentTable(queryRunner: QueryRunner): Promise<void> {
  await queryRunner.createTable(
      new Table({
        name: 'continent',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
          },
          {
            length: '255',
            name: 'name',
            type: 'varchar',
            isNullable: false,
          },
        ],
      })
  );
}

async function createCountryTable(queryRunner: QueryRunner): Promise<void> {
  await queryRunner.createTable(
      new Table({
        name: 'country',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
          },
          {
            length: '255',
            name: 'name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'continent_id',
            type: 'varchar',
            isNullable: false,
          },
        ],
      })
  );

  return queryRunner.createForeignKey(
      'country',
      new TableForeignKey({
        columnNames: ['continent_id'],
        name: 'city_continent_id_foreign',
        referencedColumnNames: ['id'],
        referencedTableName: 'continent',
        onDelete: 'CASCADE',
      })
  );
}

async function createCityTable(queryRunner: QueryRunner): Promise<void> {
  await queryRunner.createTable(
    new Table({
      name: 'city',
      columns: [
        {
          name: 'id',
          type: 'varchar',
          isPrimary: true,
        },
        {
          length: '255',
          name: 'name',
          type: 'varchar',
          isNullable: false,
        },
        {
          name: 'country_id',
          type: 'varchar',
          isNullable: false,
        },
      ],
    })
  );

  return queryRunner.createForeignKey(
    'city',
    new TableForeignKey({
      columnNames: ['country_id'],
      name: 'city_country_id_foreign',
      referencedColumnNames: ['id'],
      referencedTableName: 'country',
      onDelete: 'CASCADE',
    })
  );
}

export class initial1682605402629 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    /* createTable // foreign key(s) */
    await createContinentTable(queryRunner);
    await createCountryTable(queryRunner);
    return await createCityTable(queryRunner);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('city', true);
    await queryRunner.dropTable('country', true);
    return queryRunner.dropTable('continent', true);
  }
}
