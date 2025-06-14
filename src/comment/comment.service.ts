import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CommentRepositoryPort } from './repository/comment.repository.port';
import { Comment } from './entity/comment.entity';
import { KeywordAlertService } from 'src/keyword-alert/keyword-alert.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { PostRepositoryPort } from 'src/post/repository/post.repository.port';
import { plainToInstance } from 'class-transformer';
import { CommentResponseDto } from './dto/comment-response.dto';

@Injectable()
export class CommentService {
    constructor(
        @Inject('CommentRepositoryPort')
        private readonly commentRepository: CommentRepositoryPort,
        @Inject('PostRepositoryPort')
        private readonly postRepository: PostRepositoryPort,
        private readonly keywordAlertService: KeywordAlertService
    ) { }

    async getCommentsByPost(postId: number): Promise<CommentResponseDto[]> {
        const rawComments = await this.commentRepository.findAllByPostId(postId);

        if (!rawComments) return rawComments;

        // 답글(reply)에 해당하는 댓글 ID 집합 만들기
        const replyCommentIds = new Set<number>();
        rawComments.forEach(comment => {
            if (comment.replies) {
                comment.replies.forEach(reply => replyCommentIds.add(reply.id));
            }
        });

        // 답글(reply)이 아닌 최상위 댓글만 필터링
        const topLevelComments = rawComments.filter(comment => !replyCommentIds.has(comment.id));

        return plainToInstance(CommentResponseDto, topLevelComments, {
            excludeExtraneousValues: true,
            enableImplicitConversion: true,
        });
    }

    async createComment(dto: CreateCommentDto): Promise<Comment> {
        const post = await this.postRepository.findOneById(dto.postId);

        let parentComment: Comment | null = null;
        if (dto.parentCommentId) {
            const found = await this.commentRepository.findByParentCommentId(dto.parentCommentId);
            if (!found) throw new NotFoundException('Parent Comment not found');
            parentComment = found;
        }

        const comment = new Comment();
        comment.content = dto.content;
        comment.authorName = dto.authorName;
        comment.post = post;
        comment.parentComment = parentComment;

        const saved = await this.commentRepository.save(comment);

        await this.keywordAlertService.checkAndNotify(dto.authorName, dto.content);

        return saved;
    }
}
