import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from '../entity/comment.entity';
import { CommentRepositoryPort } from './comment.repository.port';
import { CreateCommentDto } from '../dto/create-comment.dto';

@Injectable()
export class CommentRepository implements CommentRepositoryPort {
    constructor(
        @InjectRepository(Comment)
        private readonly commentRepo: Repository<Comment>,
    ) { }

    async findAllByPostId(postId: number): Promise<Comment[]> {
        return this.commentRepo.find({
            where: { post: { id: postId } },
            relations: ['replies', 'parentComment'],
            order: { createdAt: 'ASC' },
        });
    }

    save(comment: Comment): Promise<Comment> {
        return this.commentRepo.save(comment);
    }

    async findByParentCommentId(id: number): Promise<Comment> {
        const comment = await this.commentRepo.findOneBy({ id });

        if (!comment) throw new NotFoundException('Parent Comment not found');
        return comment;
    }
}
