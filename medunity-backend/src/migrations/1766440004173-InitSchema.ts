import { MigrationInterface, QueryRunner } from "typeorm";

export class InitSchema1766440004173 implements MigrationInterface {
    name = 'InitSchema1766440004173'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "news" RENAME COLUMN "content" TO "paragraphs"`);
        await queryRunner.query(`ALTER TABLE "news" DROP COLUMN "paragraphs"`);
        await queryRunner.query(`ALTER TABLE "news" ADD "paragraphs" json`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "news" DROP COLUMN "paragraphs"`);
        await queryRunner.query(`ALTER TABLE "news" ADD "paragraphs" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "news" RENAME COLUMN "paragraphs" TO "content"`);
    }

}
