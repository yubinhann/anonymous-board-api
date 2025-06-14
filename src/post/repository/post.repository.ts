import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Post } from '../entity/post.entity';
import { PostRepositoryPort } from './post.repository.port';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';
import { FindAllPostsQueryDto } from '../dto/find-all-post-query.dto';

@Injectable()
export class PostRepository implements PostRepositoryPort {
    constructor(
        @InjectRepository(Post)
        private readonly postRepo: Repository<Post>,
    ) { }

    async findAll(filters: FindAllPostsQueryDto) {
        const { title, authorName, page = 1, limit = 10 } = filters;

        const queryBuilder = this.postRepo.createQueryBuilder('post');

        if (title?.trim()) {
            queryBuilder.andWhere('MATCH(post.title) AGAINST(:title IN BOOLEAN MODE)', { title });
        }
        if (authorName?.trim()) {
            queryBuilder.andWhere('MATCH(post.authorName) AGAINST(:authorName IN BOOLEAN MODE)', { authorName });
        }

        queryBuilder
            .skip((page - 1) * limit)
            .take(limit)
            .orderBy('post.createdAt', 'DESC')
            .leftJoinAndSelect('post.comments', 'comments')
            .leftJoinAndSelect('comments.parentComment', 'parentComment')


        const [data, total] = await queryBuilder.getManyAndCount();

        return { data, total };
    }

    async create(createPostDto: CreatePostDto) {
        const post = this.postRepo.create(createPostDto);
        return this.postRepo.save(post);
    }

    async update(id: number, updatePostDto: UpdatePostDto) {
        const post = await this.postRepo.findOneBy({ id });
        if (!post) throw new NotFoundException('Post not found');

        if (post.password !== updatePostDto.password) {
            throw new ForbiddenException('Invalid password');
        }

        post.title = updatePostDto.title ?? post.title;
        post.content = updatePostDto.content ?? post.content;
        post.authorName = updatePostDto.authorName ?? post.authorName;

        return this.postRepo.save(post);
    }

    async remove(id: number, password: string): Promise<void> {
        const post = await this.postRepo.findOneBy({ id });
        if (!post) throw new NotFoundException('Post not found');

        if (post.password !== password) throw new ForbiddenException('Invalid password');

        await this.postRepo.delete(id);
    }

    async findOneById(id: number): Promise<Post> {
        const post = await this.postRepo.findOneBy({ id });
        if (!post) throw new NotFoundException('Post not found');
        return post;
    }
}
