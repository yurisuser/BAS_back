import { Controller, Get, Put, Body, HttpException, HttpStatus, Delete, Param } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create.user.dto";

@Controller('user')
export class UserController{
    constructor(
        private userSrv: UserService,
    ){}
    
    @Get()
    async findAll(): Promise<any[]> {
        return await this.userSrv.findAll();
    }

    @Put()
    async createUser(@Body() newUser : CreateUserDto): Promise<any> {
        const user = await this.userSrv.findByLogin(newUser.name);
        if (user) throw new HttpException('User already registered', HttpStatus.BAD_REQUEST);
        return await this.userSrv.create(newUser);
    }

    @Delete('/:id')
    async delete(@Param('id') id: number): Promise<any> {
        const user = await this.userSrv.findById(id);
        if (!user) throw new HttpException('User not exist', HttpStatus.NOT_FOUND);
        return await this.userSrv.delete(id);
    }
}