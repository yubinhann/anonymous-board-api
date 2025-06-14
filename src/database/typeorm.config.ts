import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleAsyncOptions = {
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        url: configService.getOrThrow<string>('DB_URL'),
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: false,
        // logging: true
    }),
};
