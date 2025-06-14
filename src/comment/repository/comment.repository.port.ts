import { Comment } from '../entity/comment.entity';

export interface CommentRepositoryPort {
    findAllByPostId(postId: number): Promise<Comment[]>;
    save(comment: Partial<Comment>): Promise<Comment>;
    findByParentCommentId(id: number): Promise<Comment>;
}
