import { Module } from '@nestjs/common';
import { MongoModule } from 'nest-mongodb';

import { AnaliticController } from './analitic.controller';
import { AnaliticService } from './analitic.service';
import { DBWorker } from './db.worker';

@Module({
    controllers: [
        AnaliticController,
    ],
    providers: [
        AnaliticService,
        DBWorker,
    ],
    exports: [
    ],
    imports: [
        MongoModule.forRoot('mongodb://localhost', 'test'),
    ],
})
export class AnaliticModule {
}
