import { Inject, Injectable } from '@nestjs/common';
import { PostRepositoryPort } from './repository/post.repository.port';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { KeywordAlertService } from 'src/keyword-alert/keyword-alert.service';
import { FindAllPostsQueryDto } from './dto/find-all-post-query.dto';

@Injectable()
export class PostService {
    constructor(
        @Inject('PostRepositoryPort')
        private readonly postRepository: PostRepositoryPort,
        private readonly keywordAlertService: KeywordAlertService
    ) { }

    findAll(query: FindAllPostsQueryDto) {
        return this.postRepository.findAll(query);
    }

    async create(createPostDto: CreatePostDto) {
        const newPost = await this.postRepository.create(createPostDto);
        await this.keywordAlertService.checkAndNotify(createPostDto.authorName, createPostDto.content);

        return newPost;
    }

    update(id: number, updatePostDto: UpdatePostDto) {
        return this.postRepository.update(id, updatePostDto);
    }

    remove(id: number, password: string) {
        return this.postRepository.remove(id, password);
    }
}
