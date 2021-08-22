import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "../auth/user.entity";

@Entity()
export class Board extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;

    @ManyToOne((type) => User)
    @JoinColumn()
    user: User;

    @Column()
    title: string;

    @Column("text")
    description: string;

    @Column({ default: 0 })
    view_count: number;

    @Column({ default: false })
    isLike: boolean;

    @CreateDateColumn()
    createdAt: Date;
}
