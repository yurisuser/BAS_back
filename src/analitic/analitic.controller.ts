import { Controller, Get, Post, Body, HttpException, HttpStatus, Param, Query } from '@nestjs/common';

import { AnaliticService } from './analitic.service';
import { UploadResponce } from './models/uploadResponse';

@Controller('analitic')
export class AnaliticController {
    constructor(
        private srv: AnaliticService,
    ) {}

    @Get()
    public getAll() {
        return this.srv.getAll();
    }

    @Get('names')
    public async getCollections() {
        return await this.srv.getCollectionsNames();
    }

    @Get('info')
    public async getCollectionsInfo() {
        return await this.srv.getCollectionsInfo();
    }

    @Get('distinct')
    public async distinct(@Query() q) {
        console.log(q);

        const a = await this.srv.distinct(q.collection, q.field);
        console.log(a);
        return a;
    }

    @Get('fields')
    public async getFields(@Query() q) {
        return await this.srv.getFields(q.collection);
    }

    @Post()
    public async addToCollection(@Body() body: any): Promise<UploadResponce> {
        return await this.srv.AddToTable(body.tableName, body.file);
    }

    @Post('create')
    public async createCollection(@Body() body: {name: string}) {
        const existCollections = await this.srv.getCollectionsNames();
        if (!body.name) {
            throw new HttpException('Empty collection name', HttpStatus.BAD_REQUEST);
        }
        if (existCollections.includes(body.name)) {
            throw new HttpException('Collection is exist', HttpStatus.BAD_REQUEST);
        }
        await this.srv.CreateCollection(body.name);
        return await this.srv.getCollectionsInfo();
    }

    @Post('userrequest')
    public async userRequest(@Body() body: any) {
        return await this.srv.searchByParam(body.table, body.data);
    }
}
