import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Site {

    @PrimaryGeneratedColumn({ type: "int" })
    id!: number;

    @Column()
    name!: string;

    @Column()
    username!: string;

    @Column()
    password!: string;

    @Column({ name: 'user_id' })
    userId: string;


    @ManyToOne(() => User, (user) => user.sites)
    @JoinColumn({ name: "user_id" })
    user: User;
}