import {MigrationInterface, QueryRunner} from "typeorm";

export class email1572350407521 implements MigrationInterface {
    name = 'email1572350407521'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `user` ADD `email` varchar(255) NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `user` ADD UNIQUE INDEX `IDX_e12875dfb3b1d92d7d7c5377e2` (`email`)", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `user` DROP INDEX `IDX_e12875dfb3b1d92d7d7c5377e2`", undefined);
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `email`", undefined);
    }

}
