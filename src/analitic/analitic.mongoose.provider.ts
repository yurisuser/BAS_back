import * as mongoose from 'mongoose';

export const dataBaseProviders = [
    {
        provide: 'analitic_connection',
        useFactory: (connection: mongoose.Connection): Promise<typeof mongoose> =>
        mongoose.connect('mongodb://localhost/analitic'),
    },
];
