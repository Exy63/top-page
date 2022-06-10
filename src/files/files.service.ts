import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { FileElementResponse } from './dto/file-element.response';
import { format } from 'date-fns';
import { path } from 'app-root-path';
import { ensureDir, writeFile } from 'fs-extra';

@Injectable()
export class FilesService {
  async saveFiles(
    files: Express.Multer.File[],
  ): Promise<FileElementResponse[]> {
    const dateFolder = format(new Date(), 'yyyy-MM-dd');
    const uploadFolder = `${path}/uploads/${dateFolder}`;

    await ensureDir(uploadFolder);

    const res: FileElementResponse[] = [];

    for (const file of files) {
      const { buffer, originalname } = file;

      await writeFile(`${uploadFolder}/${originalname}`, buffer, (err) => {
        if (err) throw new ServiceUnavailableException(err);
      });

      res.push({
        url: `${dateFolder}/${originalname}`,
        name: originalname,
      });
    }

    return res;
  }
}
