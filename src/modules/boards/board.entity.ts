import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../auth/user.entity";

@Entity()
export class Board extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column('text')
    description: string;

    @Column()
    userId: number;

    @ManyToOne(type => User)
    @JoinColumn()
    user: User;

    @CreateDateColumn()
    createdAt: Date;
}