import { IsNotEmpty, IsString } from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreatePostDto {
    @ApiProperty({ description: '게시글 제목' })
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty({ description: '게시글 내용' })
    @IsString()
    @IsNotEmpty()
    content: string;

    @ApiProperty({ description: '작성자 이름' })
    @IsString()
    @IsNotEmpty()
    authorName: string;

    @ApiProperty({ description: '작성자 비밀번호' })
    @IsString()
    @IsNotEmpty()
    password: string;
}
