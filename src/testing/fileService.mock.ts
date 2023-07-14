import { FileService } from '../files/file.service';

export const fileServiceMock = {
  provide: FileService,
  useValue: {
    upload: jest.fn().mockResolvedValue(''),
  },
};
