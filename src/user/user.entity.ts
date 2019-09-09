import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true, length: 255})
    name: string;

    @Column({ length: 255 })
    password: string;
}