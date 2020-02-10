import { HttpException } from '@nestjs/common';

export interface ParsingCSV {
    err: boolean;
    message: string;
    data: JSON[];
}
