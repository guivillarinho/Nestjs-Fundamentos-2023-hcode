import { UserService } from '../user/user.service';

export const userServiceMock = {
  provide: UserService,
  useValue: {
    createUser: jest.fn(),
    readUniqueUser: jest.fn(),
    readAllUsers: jest.fn(),
    updateUser: jest.fn(),
    partialUpdateUser: jest.fn(),
    deleteUser: jest.fn(),
    verifyUserIdExists: jest.fn(),
    verifyUserEmailExists: jest.fn(),
  },
};
