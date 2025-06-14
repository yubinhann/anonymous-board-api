import { Inject, Injectable } from '@nestjs/common';
import { KeywordAlertRepositoryPort } from './repository/keyword-alert.repository.port';

@Injectable()
export class KeywordAlertService {
    constructor(
        @Inject('KeywordAlertRepositoryPort')
        private readonly keywordAlertRepo: KeywordAlertRepositoryPort
    ) { }

    async checkAndNotify(authorName: string, content: string) {
        const alerts = await this.keywordAlertRepo.findByAuthorName(authorName);

        for (const alert of alerts) {
            if (content.includes(alert.keyword)) {
                this.sendNotification(authorName, alert.keyword, content);
            }
        }
    }

    private sendNotification(authorName: string, keyword: string, content: string) {
        console.log(`[Notify] Author: ${authorName}, Keyword: "${keyword}", Content: ${content}.`);
    }
}
