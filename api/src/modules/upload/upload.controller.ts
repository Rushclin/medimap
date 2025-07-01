import {
  BadRequestException,
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { FilesService } from 'src/providers/files/files.service';
import { FichierObj, File } from 'src/providers/files/types';

@Controller('upload')
export class UploadController {
  constructor(private uploadService: FilesService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('files'))
  async upload(@UploadedFiles() files: File[]): Promise<FichierObj[]> {
    if (files && files.length) return await this.uploadService.upload(files);
    else throw new BadRequestException();
  }
}
