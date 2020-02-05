import { HttpException } from '@nestjs/common';

export interface ParsingCSV {
    message: string;
    data: JSON[];
}
