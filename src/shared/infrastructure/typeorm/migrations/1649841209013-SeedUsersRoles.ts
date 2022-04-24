import { MigrationInterface, QueryRunner } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Role } from '@modules/Role/infrastructure/typeorm/entities/Role';
import { User } from '@modules/User/infrastructure/typeorm/entities/User';
import { RolesEnum } from '@modules/Role/domain/entities/role-enum';

export class SeedUsers1649841209013 implements MigrationInterface {
  name = `SeedUsersRoles1639841209013`;
  public async up(queryRunner: QueryRunner): Promise<void> {
    //Seeding Roles
    const adminRoleId = uuid();
    const userRoleId = uuid();

    await queryRunner.manager.save(
      queryRunner.manager.create<Role>(Role, {
        id: userRoleId,
        name: RolesEnum.user,
      }),
    );
    await queryRunner.manager.save(
      queryRunner.manager.create<Role>(Role, {
        id: adminRoleId,
        name: RolesEnum.admin,
      }),
    );

    //Seeding Users
    await queryRunner.manager.save(
      queryRunner.manager.create<User>(User, {
        id: uuid(),
        username: 'USER1',
        password: process.env.USER1_PASS,
        email: 'teste1',
        avatar_url: 'teste1',
        role_id: userRoleId,
      }),
    );
    await queryRunner.manager.save(
      queryRunner.manager.create<User>(User, {
        id: uuid(),
        username: 'USER2',
        password: process.env.USER2_PASS,
        email: 'teste2',
        avatar_url: 'teste2',
        role_id: userRoleId,
      }),
    );
    await queryRunner.manager.save(
      queryRunner.manager.create<User>(User, {
        id: uuid(),
        username: 'ADMIN-USER',
        password: process.env.ADMIN_PASS,
        email: 'teste3',
        avatar_url: 'teste3',
        role_id: adminRoleId,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DELETE * FROM users');
  }
}
