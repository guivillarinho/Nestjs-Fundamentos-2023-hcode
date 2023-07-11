import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({
    name: 'user'
})
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 200})
    name: string;

    @Column()

    @Column({length: 200})
    email: string; 

    @Column({length: 200})
    password: string 

    @Column()
    birthAt: string

    @CreateDateColumn()
    createdAt: string  

    @UpdateDateColumn()
    updatedAt: string

    @Column()
    role: string
}