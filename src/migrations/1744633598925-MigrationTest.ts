import { MigrationInterface, QueryRunner } from "typeorm";

export class MigrationTest1744633598925 implements MigrationInterface {
    name = 'MigrationTest1744633598925'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product\` ADD \`testSync\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`testSync\``);
    }

}
