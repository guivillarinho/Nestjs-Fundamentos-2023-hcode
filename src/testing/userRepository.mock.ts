import { getRepositoryToken } from "@nestjs/typeorm";
import { UserEntity } from "../user/entity/user.entity";

export const userRepositoryMock= {
    provide: getRepositoryToken(UserEntity),
    useValue: {
      create: jest.fn(),
      save: jest.fn(),
      find: jest.fn(),
      findOneBy: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      exist: jest.fn(),
      findOne: jest.fn(),
    },
}