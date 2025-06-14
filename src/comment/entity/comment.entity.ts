
import { Post } from "src/post/entity/post.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    content: string;

    @Column({ name: 'author_name' })
    authorName: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @ManyToOne(() => Post, post => post.comments)
    post: Post;

    @ManyToOne(() => Comment, comment => comment.replies, { nullable: true })
    @JoinColumn({ name: 'parent_comment_id' })
    parentComment: Comment | null;

    @OneToMany(() => Comment, comment => comment.parentComment)
    replies: Comment[];
}