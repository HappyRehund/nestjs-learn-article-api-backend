import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUserEntityAddColumnRefreshToken1765339162164 implements MigrationInterface {
    name = 'UpdateUserEntityAddColumnRefreshToken1765339162164'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "hashedRefreshToken" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "hashedRefreshToken"`);
    }

}
