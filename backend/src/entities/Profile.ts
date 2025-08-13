import { Entity, PrimaryGeneratedColumn, Column, OneToOne,JoinColumn } from "typeorm"
import { User } from "./User"

@Entity()
export class Profile{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name:string

    @Column({nullable: true})
    photo!: string

    @Column()
    location:string

    @Column()
    birthDate:Date

    @Column("float",{ default: 0 })
    height:number

    @Column("float",{ default: 0 })
    weight:number

    @OneToOne(() => User, (user) => user.profile)
    @JoinColumn() 
    user!: User;
}


