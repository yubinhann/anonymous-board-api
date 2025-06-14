import { IsNotEmpty, IsOptional, IsString, IsNumber, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateCommentDto {
    @ApiProperty({ description: '게시글 id' })
    @IsNotEmpty()
    @Type(() => Number)
    @IsInt()
    postId: number;

    @ApiProperty({ description: '부모 댓글 id' })
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    parentCommentId?: number;

    @ApiProperty({ description: '댓글 작성자 이름' })
    @IsNotEmpty()
    @IsString()
    authorName: string;

    @ApiProperty({ description: '댓글 내용' })
    @IsNotEmpty()
    @IsString()
    content: string;
}
