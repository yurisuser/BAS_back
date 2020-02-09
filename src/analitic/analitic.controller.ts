import { Controller, Get, Post, Body } from '@nestjs/common';

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

    @Get('/collections/names')
    public async getCollections() {
        return await this.srv.getCollectionsNames();
    }

    @Get('/collections/info')
    public async getCollectionsInfo() {
        return await this.srv.getCollectionsInfo();
    }

    @Post()
    public async addToCollection(@Body() body: any): Promise<UploadResponce> {
        return await this.srv.AddToTable(body.tableName, body.file);
    }

    @Post('collections/create')
    public async createCollection(@Body() body: {name: string}) {
        await this.srv.CreateCollection(body.name);
        return {text: 'ok'};
    }
}
