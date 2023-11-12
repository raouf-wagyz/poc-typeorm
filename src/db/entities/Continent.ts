import {Entity, Column, PrimaryGeneratedColumn, OneToMany, PrimaryColumn, BaseEntity} from "typeorm";
import {City} from "./City"
import {Country} from "@entities/Country";

@Entity()
export class Continent  extends BaseEntity {

    @PrimaryColumn()
    id!: string;

    @Column()
    name!: string;

    @OneToMany(type => Country, country => country.continent, {"cascade": true})
    countries!: Country[];
}