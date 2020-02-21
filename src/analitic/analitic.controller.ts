import { Controller, Get, Post, Body, HttpException, HttpStatus, Query } from '@nestjs/common';

import { AnaliticService } from './analitic.service';
import { UploadResponce } from './models/uploadResponse';
import { AnaliticDataDto } from './dto/analitic.data.dto';
import { AnaliticDataResponce } from './models/analitic.data.responce';

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
        return await this.srv.distinct(q.collection, q.field);
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
    public async userRequest(@Body() body: AnaliticDataDto): Promise<AnaliticDataResponce> {
        const size = body.size || null;
        const page = body.page || null;
        const id = body.id || null;
        console.log(body);

        return await this.srv.searchByParam(body.table, body.data, size, page, id);
    }
}
