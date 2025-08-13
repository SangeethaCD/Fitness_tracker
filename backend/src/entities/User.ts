import { Entity, PrimaryGeneratedColumn, Column,OneToOne, ManyToOne} from "typeorm";
import { Profile } from "./Profile";
import { Goals } from "./Goals";
@Entity()
export class User{
  @PrimaryGeneratedColumn()
  userId!: number;

  @Column()
  userName!: string;

  @Column({unique: true})
  email: string;

  @Column()
  password: string;

  @OneToOne(() => Profile, (profile) => profile.user)
  profile!: Profile;

  @ManyToOne(() => Goals,(Goals)=> Goals.user)
  goals!:Goals;

}