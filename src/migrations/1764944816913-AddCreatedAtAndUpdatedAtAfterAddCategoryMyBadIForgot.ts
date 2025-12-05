import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCreatedAtAndUpdatedAtAfterAddCategoryMyBadIForgot1764944816913 implements MigrationInterface {
    name = 'AddCreatedAtAndUpdatedAtAfterAddCategoryMyBadIForgot1764944816913'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "category" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "category" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "createdAt"`);
    }

}
