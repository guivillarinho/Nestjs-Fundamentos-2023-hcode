import { UserService } from '../user/user.service';
import { userEntityList } from './userEntity.mock';

export const userServiceMock = {
  provide: UserService,
  useValue: {
    createUser: jest.fn().mockResolvedValue(userEntityList[0]),
    readUniqueUser: jest.fn().mockResolvedValue(userEntityList[0]),
    readAllUsers: jest.fn().mockResolvedValue(userEntityList),
    updateUser: jest.fn().mockResolvedValue(userEntityList[0]),
    partialUpdateUser: jest.fn().mockResolvedValue(userEntityList[0]),
    deleteUser: jest.fn().mockResolvedValue(userEntityList[0]),
    verifyUserIdExists: jest.fn().mockResolvedValue(true),
    verifyUserEmailExists: jest.fn(),
  },
};
