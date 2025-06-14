import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { CommentService } from './comment.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateCommentDto } from './dto/create-comment.dto';

@ApiTags('Comment')
@Controller('comment')
export class CommentController {
    constructor(private readonly commentService: CommentService) { }

    @ApiOperation({ summary: '댓글 조회' })
    @Get('post/:postId')
    getComments(@Param('postId') postId: number) {
        return this.commentService.getCommentsByPost(postId);
    }

    @ApiOperation({ summary: '댓글 작성' })
    @Post()
    createComment(@Body() body: CreateCommentDto) {
        return this.commentService.createComment(body);
    }
}
