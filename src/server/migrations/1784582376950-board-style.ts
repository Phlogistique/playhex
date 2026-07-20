import { MigrationInterface, QueryRunner } from "typeorm";

export class BoardStyle1784582376950 implements MigrationInterface {
    name = 'BoardStyle1784582376950'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`player_settings\` ADD \`boardStyle\` varchar(16) NOT NULL DEFAULT 'hex'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`player_settings\` DROP COLUMN \`boardStyle\``);
    }

}
