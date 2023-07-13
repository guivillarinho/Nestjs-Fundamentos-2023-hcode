import { UserService } from '../user/user.service';
import { userEntityList } from './userEntity.mock';

export const userServiceMock = {
  provide: UserService,
  useValue: {
    createUser: jest.fn().mockReturnValue(userEntityList[0]),
    readUniqueUser: jest.fn().mockReturnValue(userEntityList[0]),
    readAllUsers: jest.fn().mockReturnValue(userEntityList),
    updateUser: jest.fn(),
    partialUpdateUser: jest.fn(),
    deleteUser: jest.fn(),
    verifyUserIdExists: jest.fn(),
    verifyUserEmailExists: jest.fn(),
  },
};
