import { MigrationInterface, QueryRunner } from "typeorm";

export class BoardStyle1784000000000 implements MigrationInterface {
    name = 'BoardStyle1784000000000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`player_settings\` ADD \`boardStyle\` varchar(16) NOT NULL DEFAULT 'hexagons'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`player_settings\` DROP COLUMN \`boardStyle\``);
    }

}
