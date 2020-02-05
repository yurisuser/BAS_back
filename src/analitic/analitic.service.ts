import { Injectable } from '@nestjs/common';
import * as mongo from 'mongodb';
import { InjectDb } from 'nest-mongodb';

import { DBWorker } from './db.worker';
import { UploadResponce } from './models/uploadResponse';

@Injectable()
export class AnaliticService {
    private readonly collection: mongo.Collection;
    constructor(
        @InjectDb() private readonly db: mongo.Db,
        private dbworker: DBWorker,
    ) {
        this.collection = this.db.collection('test');
    }

    async getAll(): Promise<any> {
        const ans = await this.collection.find({}).toArray();
        return ans;
    }

    async AddToTable(tablename: string, data): Promise<UploadResponce> {
            const parsingData = await this.dbworker.parseCSV(data);
            if (parsingData.data) {
                await this.db.collection(tablename).insertMany(parsingData.data);
                return {text: 'Succes'};
            }
            return { text: parsingData.message};
    }
}
