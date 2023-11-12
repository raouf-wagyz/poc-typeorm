import {Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, PrimaryColumn, BaseEntity} from "typeorm";
import {City} from "./City"
import {Continent} from "@entities/Continent";

@Entity()
export class Country extends BaseEntity {

    @PrimaryColumn()
    id!: string;

    @Column()
    name!: string;

    @ManyToOne(type => Continent)
    continent!: Continent;

    @OneToMany(type => City, city => city.country, {"cascade": true})
    cities!: City[];
}