import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUserRemoveAvatar1748349704463 implements MigrationInterface {
    name = 'UpdateUserRemoveAvatar1748349704463'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "users" DROP CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3"
        `);
        await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "email"
        `);
        await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "passwordHash"
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD "kakaoId" character varying
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD "appleId" character varying
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD "mbti" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD "gender" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD "ageGroup" character varying NOT NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "ageGroup"
        `);
        await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "gender"
        `);
        await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "mbti"
        `);
        await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "appleId"
        `);
        await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "kakaoId"
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD "passwordHash" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD "email" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email")
        `);
    }

}
