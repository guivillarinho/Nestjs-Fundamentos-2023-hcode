import { join } from 'path';
import { filetoBuffer } from './fileToBuffer';

export const getFile = async () => {
  const { buffer, stream } = await filetoBuffer(join(__dirname, 'file-1.png'));

  const file: Express.Multer.File = {
    fieldname: 'file',

    originalname: 'file-1.png',

    encoding: '7bit',

    mimetype: 'image/png',

    size: 1024 * 50,

    stream,

    destination: '',

    filename: 'file-name',

    path: 'file-path',

    buffer,
  };

  return file;
};
