import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';

import { userRepositoryMock } from '../testing/userRepository.mock';

describe('UserService', () => {
  //Criando uma variável para utilização do UserService
  let userService: UserService;

  // Recuperação de uma função externa e implementando no jest para ser utilizada para testes
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, userRepositoryMock],
    }).compile();
    //Pegando o modulo e aplicando à variável.
    userService = module.get<UserService>(UserService);
  });

  //Iniciando o test e verificando se está definida.
  test('Validate the UserService definition', () => {
    expect(userService).toBeDefined();
  });
});
