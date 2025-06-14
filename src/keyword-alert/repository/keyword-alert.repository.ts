import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { KeywordAlert } from '../entity/keyword-alert.entity';
import { KeywordAlertRepositoryPort } from './keyword-alert.repository.port';

@Injectable()
export class KeywordAlertRepository implements KeywordAlertRepositoryPort {
    constructor(
        @InjectRepository(KeywordAlert)
        private readonly repo: Repository<KeywordAlert>,
    ) { }

    findByAuthorName(authorName: string): Promise<KeywordAlert[]> {
        return this.repo.find({ where: { authorName } });
    }
}
