import { MigrationInterface, QueryRunner } from "typeorm";

export class PopulateRoles1712107114563 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        INSERT INTO user_roles (name, description) VALUES 
        ('User', 'User'),
        ('Monitor', 'Monitor');
    `);

    // User permissions
    await queryRunner.query(`
        INSERT INTO user_permissions (action, subject, conditions, role_id) VALUES 
        ('read', 'UserSession', '{ "user.id": "\${user.id}" }', (SELECT id FROM user_roles WHERE name = 'User')),
        ('refresh', 'UserSession', '{ "user.id": "\${user.id}" }', (SELECT id FROM user_roles WHERE name = 'User')),
        ('delete', 'UserSession', '{ "user.id": "\${user.id}" }', (SELECT id FROM user_roles WHERE name = 'User')),
        ('read', 'User', '{ "id": "\${user.id}" }', (SELECT id FROM user_roles WHERE name = 'User')),
        ('update', 'User', '{ "id": "\${user.id}" }', (SELECT id FROM user_roles WHERE name = 'User')),
        ('delete', 'User', '{ "id": "\${user.id}" }', (SELECT id FROM user_roles WHERE name = 'User')),
        ('read', 'MonitoringSchedule', '{ "user.id": "\${user.id}" }', (SELECT id FROM user_roles WHERE name = 'User')),
        ('schedule', 'MonitoringSchedule', null, (SELECT id FROM user_roles WHERE name = 'User')),
        ('unschedule', 'MonitoringSchedule', '{ "user.id": "\${user.id}" }', (SELECT id FROM user_roles WHERE name = 'User'));
    `);

    // Monitor permissions
    await queryRunner.query(`
        INSERT INTO user_permissions (action, subject, conditions, role_id) VALUES 
        ('create', 'Monitoring', null, (SELECT id FROM user_roles WHERE name = 'Monitor')),
        ('update', 'Monitoring', '{ "createdBy.id": "\${user.id}" }', (SELECT id FROM user_roles WHERE name = 'Monitor')),
        ('delete', 'Monitoring', '{ "createdBy.id": "\${user.id}" }', (SELECT id FROM user_roles WHERE name = 'Monitor')),
        ('update', 'MonitoringAvailability', '{ "monitoring.createdBy.id": "\${user.id}" }', (SELECT id FROM user_roles WHERE name = 'Monitor'));
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`TRUNCATE user_permissions cascade;`);
    await queryRunner.query(`TRUNCATE user_roles cascade;`);
  }
}
