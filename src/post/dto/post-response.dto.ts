import { Expose, Transform, Type } from 'class-transformer';

class CommentResponseDto {
    @Expose()
    id: number;

    @Expose()
    content: string;

    @Expose()
    authorName: string;

    @Expose()
    createdAt: Date;

    @Expose()
    @Transform(({ obj }) => (obj.parentComment ? obj.parentComment.id : null))
    parentCommentId: number | null;
}

class PostResponseDto {
    @Expose()
    id: number;

    @Expose()
    title: string;

    @Expose()
    content: string;

    @Expose()
    authorName: string;

    @Expose()
    password: string;

    @Expose()
    createdAt: Date;

    @Expose()
    updatedAt: Date;

    @Expose()
    @Type(() => CommentResponseDto)
    comments: CommentResponseDto[];
}

export class PaginatedPostResponseDto {
    @Expose()
    @Type(() => PostResponseDto)
    data: PostResponseDto[];

    @Expose()
    total: number;
}
