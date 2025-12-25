import { MigrationInterface, QueryRunner } from "typeorm";

export class InitSchema1766612667754 implements MigrationInterface {
    name = 'InitSchema1766612667754'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "contact_message" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "phone" character varying, "subject" character varying NOT NULL, "message" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "status" "public"."contact_message_status_enum" NOT NULL DEFAULT 'UNREAD', CONSTRAINT "PK_1476ca9a6265a586f618ea918fd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "patients" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "fullName" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying, "birthDate" character varying NOT NULL, "phone" character varying NOT NULL, "photo" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_64e2031265399f5690b0beba6a5" UNIQUE ("email"), CONSTRAINT "PK_a7f0b9fcbb3469d5ec0b0aceaa7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "exams" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "type" character varying NOT NULL, "date" date NOT NULL, "status" "public"."exams_status_enum" NOT NULL DEFAULT 'Pending', "fileUrl" character varying, "doctorId" uuid NOT NULL, "patientId" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_b43159ee3efa440952794b4f53e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "doctors" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "title" character varying, "specialty" character varying NOT NULL, "degrees" text array NOT NULL DEFAULT '{}', "experience" character varying, "photo" character varying, "bio" character varying, "email" character varying NOT NULL, "password" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_62069f52ebba471c91de5d59d61" UNIQUE ("email"), CONSTRAINT "PK_8207e7889b50ee3695c2b8154ff" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "activities" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "description" text NOT NULL, "image" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_7f4004429f731ffb9c88eb486a8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "news" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "date" character varying NOT NULL, "paragraphs" json, "image" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_39a43dfcb6007180f04aff2357e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "exams" ADD CONSTRAINT "FK_f2943a6962fc8215c8c861676d4" FOREIGN KEY ("doctorId") REFERENCES "doctors"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "exams" ADD CONSTRAINT "FK_613fa42014319d2839dbcca366f" FOREIGN KEY ("patientId") REFERENCES "patients"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "exams" DROP CONSTRAINT "FK_613fa42014319d2839dbcca366f"`);
        await queryRunner.query(`ALTER TABLE "exams" DROP CONSTRAINT "FK_f2943a6962fc8215c8c861676d4"`);
        await queryRunner.query(`DROP TABLE "news"`);
        await queryRunner.query(`DROP TABLE "activities"`);
        await queryRunner.query(`DROP TABLE "doctors"`);
        await queryRunner.query(`DROP TABLE "exams"`);
        await queryRunner.query(`DROP TABLE "patients"`);
        await queryRunner.query(`DROP TABLE "contact_message"`);
    }

}
