import { Controller, Get, Post, Delete, Param, Body, Query, Patch } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { FindAllPostsQueryDto } from './dto/find-all-post-query.dto';
import { PaginatedPostResponseDto } from './dto/post-response.dto';
import { plainToInstance } from 'class-transformer';
import { DeletePostDto } from './dto/delete-post.dto';

@ApiTags('Post')
@Controller('post')
export class PostController {
    constructor(private readonly postService: PostService) { }

    @ApiOperation({ summary: '게시글 조회' })
    @Get()
    async findAll(@Query() query: FindAllPostsQueryDto) {
        const result = await this.postService.findAll(query);

        return plainToInstance(PaginatedPostResponseDto, result, { excludeExtraneousValues: true });
    }

    @ApiOperation({ summary: '게시글 작성' })
    @Post()
    create(@Body() createPostDto: CreatePostDto) {
        return this.postService.create(createPostDto);
    }

    @ApiOperation({
        summary: '게시글 수정',
        description: `
            - 필드: title (string, optional) - 게시글 제목
            - 필드: authorName (string, optional) - 작성자 이름
            - 필드: content (string, optional) - 게시글 내용
            - 필드: password (string, required) - 작성자 비밀번호 (수정 시 필수)
        `,
    })
    @Patch(':id')
    update(
        @Param('id') id: number,
        @Body() updatePostDto: UpdatePostDto,
    ) {
        return this.postService.update(id, updatePostDto);
    }

    @ApiOperation({ summary: '게시글 삭제' })
    @Delete(':id')
    remove(
        @Param('id') id: number,
        @Body() { password }: DeletePostDto,
    ) {
        return this.postService.remove(id, password);
    }
}
