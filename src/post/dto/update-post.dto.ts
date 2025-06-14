import { PartialType } from '@nestjs/mapped-types';
import { CreatePostDto } from './create-post.dto';
import { IsNotEmpty, IsString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePostDto extends PartialType(CreatePostDto) {
    @ApiProperty({ description: '작성자 비밀번호' })
    @IsString()
    @IsNotEmpty()
    password: string;
}
