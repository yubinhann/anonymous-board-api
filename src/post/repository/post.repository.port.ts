import { Post } from '../entity/post.entity';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';
import { FindAllPostsQueryDto } from '../dto/find-all-post-query.dto';

export interface PostRepositoryPort {
    findAll(query: FindAllPostsQueryDto): Promise<{ data: Post[]; total: number }>;

    create(createPostDto: CreatePostDto): Promise<Post>;

    update(id: number, updatePostDto: UpdatePostDto): Promise<Post>;

    remove(id: number, password: string): Promise<void>;

    findOneById(id: number): Promise<Post>;
}
