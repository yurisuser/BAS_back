import { Controller, Get, Post, Body } from '@nestjs/common';

import { AnaliticService } from './analitic.service';

@Controller('analitic')
export class AnaliticController {
    constructor(
        private srv: AnaliticService,
    ) {}

    @Get()
    public getAll() {
        console.log('req');

        return this.srv.getAll();
    }

    @Post()
    public async addToTable(@Body() body: any){
        // console.log(body);
        return await this.srv.AddToTable(body.tableName, body.file);
        // return {add:"add"};
    }
}
