import { IsNotEmpty, IsString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DeletePostDto {
    @ApiProperty({ description: '작성자 비밀번호' })
    @IsString()
    @IsNotEmpty()
    password: string;
}
