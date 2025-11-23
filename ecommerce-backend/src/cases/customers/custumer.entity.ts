import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { State } from "../cities/entities/city.entity";

@Entity('city')
export class City {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 60, nullable: false })
    name: string;

    @Column({ length: 250, nullable: true })
    address: string;

    @Column({ length: 8, nullable: true })
    zipcode: string;

    @ManyToOne(() => City, {eager: true, nullable: false})
    state: State;



}

export { State };
