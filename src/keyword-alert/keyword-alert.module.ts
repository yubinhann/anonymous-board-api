import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { KeywordAlert } from "./entity/keyword-alert.entity";
import { KeywordAlertService } from "./keyword-alert.service";
import { KeywordAlertRepository } from "./repository/keyword-alert.repository";

@Module({
    imports: [TypeOrmModule.forFeature([KeywordAlert])],
    providers: [
        KeywordAlertService,
        {
            provide: 'KeywordAlertRepositoryPort',
            useClass: KeywordAlertRepository,
        },
    ],
    exports: ['KeywordAlertRepositoryPort', KeywordAlertService],
})
export class KeywordAlertModule { }
