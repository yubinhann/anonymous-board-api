import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentRepository } from './repository/comment.repository';
import { Comment } from './entity/comment.entity';
import { KeywordAlertModule } from 'src/keyword-alert/keyword-alert.module';
import { PostModule } from 'src/post/post.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Comment]),
    KeywordAlertModule,
    PostModule
  ],
  providers: [
    CommentService,
    {
      provide: 'CommentRepositoryPort',
      useClass: CommentRepository,
    },
  ],
  controllers: [CommentController],
})
export class CommentModule { }
