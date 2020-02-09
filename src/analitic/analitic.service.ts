import { Injectable } from '@nestjs/common';
import * as mongo from 'mongodb';
import { InjectDb } from 'nest-mongodb';

import { DBWorker } from './db.worker';
import { UploadResponce } from './models/uploadResponse';
import { async } from 'rxjs/internal/scheduler/async';
import { ICollectionsInfo } from './models/collections.info';

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

    async CreateCollection(name: string): Promise<any> {
        return await this.db.createCollection(name);
    }

    async getCollectionsNames(): Promise<string[]> {
        const ans = [];
        const data = await this.db.listCollections().toArray();
        data.forEach(x => ans.push(x.name));
        return ans;
    }

    async getCollectionsInfo(): Promise<ICollectionsInfo[]> {
        const result = [];
        const names = await this.getCollectionsNames();
        const promises = names.map(async x => {
            const info = await this.db.collection(x).stats();
            const {wiredTiger, indexDetails, totalIndexSize, indexSizes, ...data} = info;
            result.push(data);
        });
        await Promise.all(promises);
        return result;
    }
}
