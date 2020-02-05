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

    @Post()
    public async addToTable(@Body() body: any): Promise<UploadResponce> {
        return await this.srv.AddToTable(body.tableName, body.file);
    }
}
