import {BaseEntity, Column, Entity, ManyToOne, PrimaryColumn} from "typeorm";
import {Country} from "./Country"

@Entity()
export class City  extends BaseEntity {

    @PrimaryColumn()
    id!: string;

    @Column()
    name!: string;

    @ManyToOne(type => Country)
    country!: Country;
}