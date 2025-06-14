import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, Min } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class FindAllPostsQueryDto {
    @ApiPropertyOptional({ description: '게시글 제목 검색' })
    @IsOptional()
    @IsString()
    title?: string;

    @ApiPropertyOptional({ description: '작성자 이름 검색' })
    @IsOptional()
    @IsString()
    authorName?: string;

    @ApiPropertyOptional({ description: '페이지 번호', example: 1 })
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    page?: number = 1;

    @ApiPropertyOptional({ description: '페이지당 게시글 수', example: 10 })
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    limit?: number = 10;
}
