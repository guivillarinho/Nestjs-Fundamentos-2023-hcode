import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { userServiceMock } from '../testing/userService.mock';
import { AuthGuard } from '../guards/auth.guard';
import { guardMock } from '../testing/guard.mock';
import { RoleGuard } from '../guards/role.guard';
import { UserService } from './user.service';
import { createUserDtoMock } from '../testing/userCreateDto.mock';
import { userEntityList } from '../testing/userEntity.mock';
import { updateUserDtoMock } from '../testing/userUpdateDto.mock';
import { partialUpdateUserDtoMock } from '../testing/userPartialUpdateDto.mock';

describe('UserController', () => {
  let useController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [userServiceMock],
    })
      .overrideGuard(AuthGuard)
      .useValue(guardMock)
      .overrideGuard(RoleGuard)
      .useValue(guardMock)
      .compile();

    useController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  test('Definition validation', () => {
    expect(useController).toBeDefined();
    expect(userService).toBeDefined();
  });

  describe('Application of the Guards', () => {
    test('Are they being enforced?', () => {
      const guards = Reflect.getMetadata('__guards__', UserController);

      expect(guards.length).toEqual(2);
      expect(new guards[0]()).toBeInstanceOf(AuthGuard);
      expect(new guards[1]()).toBeInstanceOf(RoleGuard);
    });
  });

  describe('Create', () => {
    test('create', async () => {
      const result = await useController.createUser(createUserDtoMock);

      expect(result).toEqual(userEntityList[0]);
    });
  });

  describe('Read', () => {
    test('readAllUsers', async () => {
      const result = await useController.readAllUsers();

      expect(result).toEqual(userEntityList);
    });

    test('readUniqueUser', async () => {
      const result = await useController.readUniqueUser(userEntityList[0].id);

      expect(result).toEqual(userEntityList[0]);
    });
  });

  describe('Update', () => {
    test('updateUser', async () => {
      const result = await useController.updateUser(
        updateUserDtoMock,
        userEntityList[0].id,
      );

      expect(result).toEqual(userEntityList[0]);
    });

    test('partialUpdateUser', async () => {
      const result = await useController.partialUpdateUser(
        partialUpdateUserDtoMock,
        userEntityList[0].id,
      );

      expect(result).toEqual(userEntityList[0]);
    });
  });

  describe('Delete', () => {
    test('deleteUser', async () => {
      const result = await useController.deleteUser(userEntityList[0].id);

      expect(result).toEqual({ success: true });
    });
  });
});
