import { MigrationInterface, QueryRunner } from "typeorm";

export class AddConstraintUniqueForArticleTitle1764949229284 implements MigrationInterface {
    name = 'AddConstraintUniqueForArticleTitle1764949229284'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "article" ADD CONSTRAINT "UQ_fca3cb9ba4963678f564f22e7a8" UNIQUE ("title")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "article" DROP CONSTRAINT "UQ_fca3cb9ba4963678f564f22e7a8"`);
    }

}
