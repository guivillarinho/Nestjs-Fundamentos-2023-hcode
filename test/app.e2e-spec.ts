import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { authRegisterUserDtoMock } from '../src/testing/auth/authRegisterUserDto.mock';
import { Role } from '../src/enums/role.enum';
import dataSource from '../typeorm/data-source';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let accessToken: string;
  let userId: number;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(() => {
    app.close();
  });

  it('Registrar um novo usuário', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/register')
      .send(authRegisterUserDtoMock);

    expect(response.statusCode).toEqual(201);
    expect(typeof response.text).toEqual('string');
  });

  it('Realizar login com o novo usuário', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: authRegisterUserDtoMock.email,
        password: authRegisterUserDtoMock.password,
      });

    expect(response.statusCode).toEqual(201);
    expect(typeof response.text).toEqual('string');

    accessToken = response.text;
  });

  it('Obter dados do usuário', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/me')
      .set('Authorization', `bearer ${accessToken}`)
      .send();

    expect(response.statusCode).toEqual(201);
    expect(typeof response.body.id).toEqual('number');
    expect(response.body.role).toEqual(Role.User);
  });

  it('Registrar um novo usuário como administrador', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/register')
      .send({
        ...authRegisterUserDtoMock,
        role: Role.Admin,
        email: 'guivillarinho15@gmail.com',
      });

    expect(response.statusCode).toEqual(201);
    expect(typeof response.text).toEqual('string');

    accessToken = response.text;
  });

  it('Validar se a função do usuário é user', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/me')
      .set('Authorization', `bearer ${accessToken}`)
      .send();

    expect(response.statusCode).toEqual(201);
    expect(typeof response.body.id).toEqual('number');
    expect(response.body.role).toEqual(Role.User);

    userId = response.body.id;
  });

  it('Tentar ver a lista de todos os usuários', async () => {
    const response = await request(app.getHttpServer())
      .get('/users/all')
      .set('Authorization', `bearer ${accessToken}`)
      .send();

    expect(response.statusCode).toEqual(403);
    expect(response.body.error).toEqual('Forbidden');
  });

  it('Alterar manualmente o usuário para a função de administrador', async () => {
    const ds = await dataSource.initialize();
    const queryRunner = ds.createQueryRunner();

    await queryRunner.query(`
      UPDATE user SET role='${Role.Admin}' WHERE id='${userId}'
    `);

    const rows = await queryRunner.query(`
      SELECT * FROM user WHERE id = ${userId}
    `);

    dataSource.destroy();

    // expect(rows.length).toEqual(2);
    expect(rows[0].role).toEqual(Role.Admin);
  });

  it('Tentar ver a lista de todos os usuários, agora com acesso', async () => {
    const response = await request(app.getHttpServer())
      .get('/users/all')
      .set('Authorization', `bearer ${accessToken}`)
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body.length).toEqual(2);
  });
});
