import { KeywordAlert } from '../entity/keyword-alert.entity';

export interface KeywordAlertRepositoryPort {
    findByAuthorName(authorName: string): Promise<KeywordAlert[]>;
}
