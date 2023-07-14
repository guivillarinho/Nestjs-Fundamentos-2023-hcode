import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { Repository } from 'typeorm';
import { UserEntity } from './entity/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { updateUserDtoMock } from '../testing/user/userUpdateDto.mock';
import { userRepositoryMock } from '../testing/user/userRepository.mock';
import { createUserDtoMock } from '../testing/user/userCreateDto.mock';
import { userEntityList } from '../testing/user/userEntity.mock';
import { partialUpdateUserDtoMock } from '../testing/user/userPartialUpdateDto.mock';

describe('UserService', () => {
  //Criando uma variável para utilização do UserService
  let userService: UserService;

  let userRepository: Repository<UserEntity>;

  // Recuperação de uma função externa e implementando no jest para ser utilizada para testes
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, userRepositoryMock],
    }).compile();
    //Pegando o modulo e aplicando à variável.
    userService = module.get<UserService>(UserService);

    userRepository = module.get(getRepositoryToken(UserEntity));
  });

  //Iniciando o test e verificando se está definida.
  test('Validate the UserService definition', () => {
    expect(userService).toBeDefined();
    expect(userRepository).toBeDefined();
  });

  describe('CreateUser', () => {
    test('createUser', async () => {
      // jest.spyOn(userRepository, 'exist').mockResolvedValueOnce(false)

      const result = await userService.createUser(createUserDtoMock);

      expect(result).toEqual(userEntityList[0]);
    });
  });

  describe('Read', () => {
    test('readAllUsers', async () => {
      const result = await userService.readAllUsers();

      expect(result).toEqual(userEntityList);
    });

    test('readUniqueUser', async () => {
      const result = await userService.readUniqueUser(2);

      expect(result).toEqual(userEntityList[0]);
    });
  });

  describe('Update', () => {
    test('updateUser', async () => {
      const result = await userService.updateUser(2, updateUserDtoMock);

      expect(result).toEqual(userEntityList[0]);
    });

    test('partialUpdateUser', async () => {
      const result = await userService.partialUpdateUser(
        2,
        partialUpdateUserDtoMock,
      );

      expect(result).toEqual(userEntityList[0]);
    });
  });

  describe('Delete', () => {
    test('deleteUser', async () => {
      const result = await userService.deleteUser(2);

      expect(result).toEqual(userEntityList[0]);
    });
  });
});
