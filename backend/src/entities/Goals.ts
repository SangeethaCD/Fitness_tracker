import { Entity, PrimaryGeneratedColumn, Column,JoinColumn, ManyToOne } from "typeorm"
import { User } from "./User"

@Entity()
export class Goals{
    @PrimaryGeneratedColumn()
    id: number

    @Column({default:0})
    steps:number

    @Column({nullable: true})
    running:number

    @Column({default:0})
    sleeping:number

    @Column("float",{default:0})
    weight:number

    @Column("float",{default:0})
    water:number

    @ManyToOne(() => User, (user) => user.goals)
    @JoinColumn() 
    user!: User;
}

