import { MigrationInterface, QueryRunner } from "typeorm";

export class PopulateUsers1712110882803 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        INSERT INTO user_profiles (first_name, last_name, age, gender, overview, degree_id) VALUES
        ('Ricardo', 'Rivera', 31, 'Masculino', 'Fullstack Developer', (SELECT id FROM degrees WHERE name = 'Tecnología en Desarrollo de Software')),
        ('Kevin', 'Sotto', 24, 'Masculino', 'Frontend Developer', (SELECT id FROM degrees WHERE name = 'Tecnología en Desarrollo de Software'));
    `);

    await queryRunner.query(`
        INSERT INTO users (email, password, profile_id) VALUES
        ('r.rivera@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$29IWwwVGgp8YKoquHJ15iA$zuOv+XvDxfzPmTjbJYcktGPGZD0aqixDScdoFpeKNL0', (SELECT id FROM user_profiles WHERE first_name = 'Ricardo')),
        ('k.sotto@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$29IWwwVGgp8YKoquHJ15iA$zuOv+XvDxfzPmTjbJYcktGPGZD0aqixDScdoFpeKNL0', (SELECT id FROM user_profiles WHERE first_name = 'Kevin'));
    `);

    await queryRunner.query(`
        INSERT INTO user_authorizations (role_id, user_id) VALUES
        ((SELECT id FROM user_roles WHERE name = 'User'), (SELECT id FROM users WHERE email = 'r.rivera@gmail.com')),
        ((SELECT id FROM user_roles WHERE name = 'Monitor'), (SELECT id FROM users WHERE email = 'r.rivera@gmail.com')),
        ((SELECT id FROM user_roles WHERE name = 'User'), (SELECT id FROM users WHERE email = 'k.sotto@gmail.com')),
        ((SELECT id FROM user_roles WHERE name = 'Monitor'), (SELECT id FROM users WHERE email = 'k.sotto@gmail.com'));
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`TRUNCATE users cascade;`);
    await queryRunner.query(`TRUNCATE user_profiles cascade;`);
    await queryRunner.query(`TRUNCATE user_authorizations cascade;`);
  }
}
