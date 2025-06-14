import { Expose, Transform, Type } from "class-transformer";

class ReplyResponseDto {
    @Expose()
    id: number;

    @Expose()
    content: string;

    @Expose()
    authorName: string;

    @Expose()
    createdAt: string;
}

export class CommentResponseDto {
    @Expose()
    id: number;

    @Expose()
    content: string;

    @Expose()
    authorName: string;

    @Expose()
    createdAt: string;

    @Expose()
    @Type(() => ReplyResponseDto)
    replies: ReplyResponseDto[];
}