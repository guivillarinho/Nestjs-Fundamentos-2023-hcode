import { FileService } from '../../files/file.service';

export const fileServiceMock = {
  provide: FileService,
  useValue: {
    getDestinationPath: jest.fn(),
    upload: jest.fn().mockResolvedValue(''),
  },
};
