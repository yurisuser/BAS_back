module.exports = [{
    "type": "mysql",
    "host": "localhost",
    "port": 3306,
    "username": "work",
    "password": "qwerty12345",
    "database": "analitic",
    "autoSchemaSync": true,
    "entities": [`./src/**/*.entity.ts`],
    "migrations": [
        "src/migration/*.ts"
    ],
    "cli": {
        "migrationsDir": "src/migration",
    }
}];