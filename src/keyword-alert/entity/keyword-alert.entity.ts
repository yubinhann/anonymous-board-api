import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class KeywordAlert {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'author_name' })
    authorName: string;

    @Column()
    keyword: string;
}
