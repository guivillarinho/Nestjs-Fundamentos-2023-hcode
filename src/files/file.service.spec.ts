import { Test, TestingModule } from '@nestjs/testing';
import { FileService } from './file.service';
import { getFile } from '../testing/file.mock';

describe('FileService', () => {
  let fileService: FileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FileService],
    }).compile();
    fileService = module.get<FileService>(FileService);
  });

  test('Validation ', () => {
    expect(fileService).toBeDefined();
  });

  describe('Send File', () => {
    test('upload', async () => {
      const file = await getFile();
      const filename = 'photo-test.png';

      fileService.upload(file, filename);
    });
  });
});
