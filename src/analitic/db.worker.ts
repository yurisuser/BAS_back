import { ParsingCSV } from './models/parsingCSV';

export class DBWorker {

    public async parseCSV(csv): Promise<ParsingCSV> {
        try {
            const rawArr = csv.split('\r\n');
            rawArr.pop();
            const headersTab = rawArr.shift().split(';');
            if (rawArr.length < 1) {
                return { message: 'data not exist', data: null };
            }
            const gotArr = new Array();
            for (let str = 0; str < rawArr.length; str++) {
                const obj = new Object();
                rawArr[str] = rawArr[str].split(';');
                for (let i = 0; i < headersTab.length; i++) {
                    if (headersTab.length !== rawArr[str].length) {
                        return {message: `Wrong length line ${str + 1}`, data: null};
                    }
                    obj[`${headersTab[i]}`] = rawArr[str][i];
                }
                gotArr.push(obj);
            }
            return { message: 'Succes', data: gotArr };
        } catch (error) {
            return { message: 'Error parsing', data: null };
        }
    }
}
