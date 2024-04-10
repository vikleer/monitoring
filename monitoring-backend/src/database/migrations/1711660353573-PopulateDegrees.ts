import { join } from "path";
import { MigrationInterface, QueryRunner } from "typeorm";
import { readcsv } from "../../utils/read-csv";

export class PopulateDegrees1711660353573 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await insertDegrees(queryRunner);
    await insertDegreeSubjects(queryRunner);
    await insertAcademicPrograms(queryRunner);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("TRUNCATE TABLE degrees CASCADE");
    await queryRunner.query("TRUNCATE TABLE degree_subjects CASCADE");
  }
}

async function insertDegrees(queryRunner: QueryRunner): Promise<void> {
  const degrees = await readcsv<{ id: string; name: string }>(
    join(__dirname, "..", "data", "degrees.csv"),
  );

  const values = degrees
    .map((degree) => `('${degree.id}', '${degree.name}')`)
    .join(", ");

  await queryRunner.query(`INSERT INTO degrees (id, name) VALUES ${values}`);
}

async function insertDegreeSubjects(queryRunner: QueryRunner): Promise<void> {
  const subjects = await readcsv<{ id: string; name: string }>(
    join(__dirname, "..", "data", "degree-subjects.csv"),
  );

  const values = subjects
    .map((subject) => `('${subject.id}', '${subject.name}')`)
    .join(", ");

  await queryRunner.query(
    `INSERT INTO degree_subjects (id, name) VALUES ${values}`,
  );
}

async function insertAcademicPrograms(queryRunner: QueryRunner): Promise<void> {
  const programs = await readcsv<{
    id: string;
    degree_id: string;
    subject_id: string;
  }>(join(__dirname, "..", "data", "academic-programs.csv"));

  const values = programs
    .map(
      (program) =>
        `('${program.id}', '${program.degree_id}', '${program.subject_id}')`,
    )
    .join(", ");

  await queryRunner.query(
    `INSERT INTO academic_programs (id, degree_id, subject_id) VALUES ${values}`,
  );
}
