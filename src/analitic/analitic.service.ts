import { Injectable, HttpException, HttpStatus, Options } from '@nestjs/common';
import * as mongo from 'mongodb';
import { InjectDb } from 'nest-mongodb';

import { UploadResponce } from './models/uploadResponse';
import { ICollectionsInfo } from './models/collections.info';
import { ParsingCSV } from './models/parsingCSV';

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

    async distinct(collectionName: string, field: string) {
        return await this.db.collection(collectionName).distinct(field);
    }

    async getFields(collection): Promise<string[]> {
        const {_id, ...ans} = await this.db.collection(collection).findOne({});
        return Object.keys(ans);
    }

    async AddToTable(collectionName: string, data): Promise<UploadResponce> {
            const parsingData = await this.parseCSV(data);
            const {_id, ...exmpl} = await this.db.collection(collectionName).findOne({});
            if (exmpl) {
                const isEq = this.isEqualsJSON(exmpl, parsingData.data[0]);
                if (!isEq) {
                    throw new HttpException('Wrong type data', HttpStatus.BAD_REQUEST);
                }
            }
            if (!parsingData.err) {
                await this.db.collection(collectionName).insertMany(parsingData.data);
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

    private async parseCSV(csv: any): Promise<ParsingCSV> {
        try {
            const rawArr = csv.split('\r\n');
            rawArr.pop();
            const headersTab = rawArr.shift().split(';');
            if (rawArr.length < 1) {
                return { err: true,  message: 'No headers or data', data: null };
            }
            const gotArr = new Array();
            for (let str = 0; str < rawArr.length; str++) {
                const obj = new Object();
                rawArr[str] = rawArr[str].split(';');
                for (let i = 0; i < headersTab.length; i++) {
                    if (headersTab.length !== rawArr[str].length) {
                        return {err: true, message: `Wrong length data: line ${str + 1}`, data: null};
                    }
                    obj[`${headersTab[i]}`] = rawArr[str][i];
                }
                gotArr.push(obj);
            }
            return { err: false, message: 'Succes', data: gotArr };
        } catch (error) {
            return {err: true, message: 'Error parsing', data: null };
        }
    }

    private isEqualsJSON(line1, line2): boolean {
        const a = Object.keys(line1);
        const b = Object.keys(line2);
        if (a.length !== b.length) {
            return false;
        }
        a.forEach(e => {
            if (!b.includes(e)) {
                return false;
            }
        });
        return true;
    }
}
