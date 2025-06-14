import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { Post } from './entity/post.entity';
import { PostRepository } from './repository/post.repository';
import { KeywordAlertModule } from 'src/keyword-alert/keyword-alert.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post]),
    KeywordAlertModule
  ],
  providers: [
    PostService,
    {
      provide: 'PostRepositoryPort',
      useClass: PostRepository,
    },
  ],
  controllers: [PostController],
  exports: ['PostRepositoryPort']
})
export class PostModule { }
