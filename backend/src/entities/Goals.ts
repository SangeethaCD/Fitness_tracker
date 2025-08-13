import { Entity, PrimaryGeneratedColumn, Column,JoinColumn, ManyToOne } from "typeorm"
import { User } from "./User"

@Entity()
export class Goals{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    steps:number

    @Column({nullable: true})
    running:number

    @Column()
    sleeping:number

    @Column("float")
    weight:number

    @Column("float")
    water:number

    @ManyToOne(() => User, (user) => user.goals)
    @JoinColumn() 
    user!: User;
}

