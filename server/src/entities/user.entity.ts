import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Site } from "./site.entity";

@Entity()
export class User {

    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    name!: string;

    @Column({ unique: true })
    username!: string;

    @Column({ select: false })
    password!: string;

    @OneToMany(
        () => Site,
        (site) => site.user,
    )
    sites: Site[];
}