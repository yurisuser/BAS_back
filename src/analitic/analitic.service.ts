import { Injectable } from '@nestjs/common';
import * as mongo from 'mongodb';
import { InjectDb } from 'nest-mongodb';

@Injectable()
export class AnaliticService {
    private readonly collection: mongo.Collection;
    constructor(
        @InjectDb() private readonly db: mongo.Db,
    ) {
        this.collection = this.db.collection('test');
    }

    async getAll(): Promise<any> {
        const ans = await this.collection.find({}).toArray();
        return ans;
    }

    async AddToTable(tablename: string, data): Promise<any> {
        let rawArr = data.split('\r\n');
        let headersTab = rawArr.shift();
        let gotArr;
        for (let str = 0; str < rawArr.length; str++) {
            rawArr[str] = rawArr[str].split(';')

        }
        return rawArr;
    }
}
