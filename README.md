# Typeorm poc Readme
This is a proof of concept based on typeorm **0.3.17** that demonstrates an issue at the query generation 
calling the findOne method on a repository.

More detailed explanation is at section [Bug Details](#bug-details)

This is a short guide to getting your local development environment up and running in no time.

## Prerequisites

Make sure the following packages are installed on your machine:

- node v16.x
- yarn
- docker

Docker service must be running on the machine.

## Setup


```bash
yarn install # install dependencies
yarn start   # start app in dev mode
```

## Swagger
After application start the Swagger UI is available at [swagger-ui](http://localhost:5050)

## Bug Details

In this POC we have 3 Entities:
* Continent
* Country
* City

related by oneToMany relations see above:

![Alt text](diagram.png?raw=true "Diagram")

When we query the city entity with this query :

```bash
this.findOne({
      where: {
        country: {
          continent: { id: 'EU' },
          name: Like('F%'),
          id: Not('FR')
        },
      },
      order: { country: { name: 'DESC' } },
    });
```

an exception is thrown 
```bash
QueryFailedError: column distinctAlias.City__City_country_name does not exist
    at PostgresQueryRunner.query (C:\workspaces\poc-typeorm\src\driver\postgres\PostgresQueryRunner.ts:299:19)
    at processTicksAndRejections (node:internal/process/task_queues:96:5)
    at SelectQueryBuilder.loadRawResults (C:\workspaces\poc-typeorm\src\query-builder\SelectQueryBuilder.ts:3789:25)
    at SelectQueryBuilder.getRawMany (C:\workspaces\poc-typeorm\src\query-builder\SelectQueryBuilder.ts:1626:29)
    at SelectQueryBuilder.executeEntitiesAndRawResults (C:\workspaces\poc-typeorm\src\query-builder\SelectQueryBuilder.ts:3457:26)
    at SelectQueryBuilder.getRawAndEntities (C:\workspaces\poc-typeorm\src\query-builder\SelectQueryBuilder.ts:1670:29)
    at SelectQueryBuilder.getOne (C:\workspaces\poc-typeorm\src\query-builder\SelectQueryBuilder.ts:1697:25)
    at C:\workspaces\poc-typeorm\node_modules\@nestjs\core\router\router-execution-context.js:46:28
    at C:\workspaces\poc-typeorm\node_modules\@nestjs\core\router\router-proxy.js:9:17
```

for the generated query with PARAMETERS: ["EU","F%","FR"] 
```bash
select
	distinct "distinctAlias"."City_id" as "ids_City_id",
	"distinctAlias"."City__City_country_name"
from
	(
	select
		"City"."id" as "City_id",
		"City"."name" as "City_name",
		"City"."country_id" as "City_country_id"
	from
		"typeorm"."city" "City"
	left join "typeorm"."country" "City__City_country" on
		"City__City_country"."id" = "City"."country_id"
	left join "typeorm"."continent" "City__City_country__City__City_country_continent" on
		"City__City_country__City__City_country_continent"."id" = "City__City_country"."continent_id"
	where
		("City__City_country__City__City_country_continent"."id" = $1
			and "City__City_country"."name" like $2
			and "City__City_country"."id" != $3)) "distinctAlias"
order by
	"distinctAlias"."City__City_country_name" desc,
	"City_id" asc
limit 1
```
this due to the query generated when the entities have columns with the same name