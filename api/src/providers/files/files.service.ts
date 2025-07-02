// import {
//   BadRequestException,
//   Injectable,
//   InternalServerErrorException,
//   Logger,
// } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import { AuthType, WebDAVClient, createClient } from 'webdav';
// import {
//   FichierObj,
//   File,
//   FileUploadOptions,
//   ResizeFormat,
//   UploadedFile,
//   UploadedFileToServer,
//   genericThumbnailFiles,
// } from './types';
// import { sanitize } from 'sanitize-filename-ts';
// import * as sharp from 'sharp';
// import pRetry from 'p-retry';
// import * as path from 'path';
// import { v4 as uuidv4 } from 'uuid';
// import { Configuration } from 'src/config/configuration.interface';

// @Injectable()
// export class FilesService {
//   private client: WebDAVClient;
//   private logger = new Logger(FilesService.name);
//   private configuration: Configuration['fileUpload'];
//   private retriesConfiguration: pRetry.Options;

//   constructor(private readonly configService: ConfigService) {
//     const applicationConfiguration =
//       this.configService.get<Configuration['fileUpload']>('fileUpload');

//     if (!applicationConfiguration) {
//       throw new Error('Invalid File Upload configuration');
//     }

//     this.configuration = applicationConfiguration;

//     this.client = createClient(this.configuration.serverUrl, {
//       authType: AuthType.Password,
//       username: this.configuration.auth.username,
//       password: this.configuration.auth.password,
//     });

//     this.retriesConfiguration = {
//       retries: this.configService.get<number>('fileUpload.retries') ?? 3,
//       minTimeout: 1 * 1000,
//       maxRetryTime: 3 * 1000,
//       factor: 2,
//     };
//   }

//   async upload(
//     files: File[],
//     options?: FileUploadOptions,
//   ): Promise<FichierObj[]> {
//     try {
//       const promises = files.map(async (file): Promise<FichierObj> => {
//         let metadata: sharp.Metadata = {
//           width: 0,
//           height: 0,
//           chromaSubsampling: '',
//         };

//         const sanitizeFilename = sanitize(file.originalname).replace('°', '');
//         const fileExtension = path.extname(file.originalname);

//         if (sanitizeFilename === '' || fileExtension === '') {
//           throw new BadRequestException('Invalid filename or extension');
//         }

//         file.originalname = sanitizeFilename;

//         const sharpedFile = sharp(file.buffer);
//         if (file.mimetype.includes('image')) {
//           metadata = await sharpedFile.metadata().catch(() => metadata);
//         }

//         const uuid = sanitize(uuidv4()).substring(0, 8).replace('-', '');
//         const partitionId = uuid.substring(0, 2) + '/' + uuid.substring(2);

//         await this.client.createDirectory(partitionId, { recursive: true });

//         let resizedFile: UploadedFileToServer;

//         const genericThumbnail = genericThumbnailFiles.get(fileExtension);
//         if (genericThumbnail) {
//           resizedFile = { ...genericThumbnail };
//           resizedFile.location =
//             this.configuration.serverUrl + resizedFile.location;
//         } else {
//           const resizedSharpedFile = sharpedFile.resize({
//             width: ResizeFormat.Size320x240.width,
//             height: ResizeFormat.Size320x240.height,
//             fit: 'inside',
//           });

//           const resizedFileBuffer = await resizedSharpedFile.toBuffer();
//           const resizeFileMetada = await sharp(resizedFileBuffer)
//             .metadata()
//             .catch(() => ({
//               width: 0,
//               height: 0,
//             }));

//           const resizedFileData: UploadedFile = {
//             encoding: file.encoding,
//             fieldname: file.fieldname,
//             originalname: this.generateResizedFileName(
//               file.originalname,
//               ResizeFormat.Size320x240.name,
//             ),
//             mimetype: file.mimetype,
//             buffer: resizedFileBuffer,
//             size: resizedFileBuffer.byteLength,
//             width: resizeFileMetada.width ?? 0,
//             height: resizeFileMetada.height ?? 0,
//           };

//           await this.saveFile(resizedFileData, partitionId);
//           const savedFileLocation =
//             this.configuration.serverUrl +
//             [partitionId, resizedFileData.originalname].join('/');

//           resizedFile = {
//             location: savedFileLocation,
//             ...resizedFileData,
//           };
//         }

//         const savedFileLocation = options?.onlySaveThumbnail
//           ? ''
//           : (await this.saveFile(file, partitionId))
//             ? [
//                 this.configuration.serverUrl,
//                 partitionId,
//                 file.originalname,
//               ].join('/')
//             : '';

//         return {
//           nom: file.originalname,
//           description: '',
//           dateModification: 0,
//           typeMime: file.mimetype,
//           tailleEnOctets: file.size,
//           originalUrl: savedFileLocation,
//           originalH: metadata.height ?? 0,
//           originalW: metadata.width ?? 0,
//           apercu320Url: resizedFile.location,
//           apercu320H: resizedFile.height ?? 0,
//           apercu320W: resizedFile.width ?? 0,
//         };
//       });

//       const responses = await Promise.all(promises);
//       this.logger.debug('Fichiers traités: %j', responses);
//       return responses;
//     } catch (error: unknown) {
//       this.logger.error(
//         "Erreur lors de l'upload",
//         error instanceof Error ? error.stack : error,
//       );
//       if (error instanceof Error) {
//         throw new InternalServerErrorException(error.message);
//       }
//       throw new InternalServerErrorException(
//         'Une erreur inconnue est survenue',
//       );
//     }
//   }

//   private generateResizedFileName(
//     filename: string,
//     formatName: string,
//   ): string {
//     const ext = path.extname(filename);
//     const root = filename.substring(0, filename.length - ext.length);
//     return `${root}${formatName}${ext}`;
//   }

//   private async saveFile(file: File, partition?: string): Promise<boolean> {
//     const { buffer } = file;
//     if (!buffer) {
//       throw new BadRequestException("Impossible d'enregistrer un buffer vide");
//     }

//     try {
//       const contentWrittenInFile = await pRetry(
//         async () => {
//           return this.client.putFileContents(
//             `${partition}/${file.originalname}`,
//             buffer,
//             { overwrite: true },
//           );
//         },
//         {
//           ...this.retriesConfiguration,
//           onFailedAttempt: (error) => {
//             this.logger.error(
//               `Upload du fichier ${file.originalname} en échec, Encore ${error.retriesLeft} tentatives`,
//               error instanceof Error ? error.stack : error,
//             );
//           },
//         },
//       );

//       if (!contentWrittenInFile) {
//         throw new InternalServerErrorException(
//           `Échec de l'upload pour ${file.originalname}`,
//         );
//       }

//       this.logger.debug('Transfer terminé du fichier ' + file.originalname);
//       return true;
//     } catch (error: unknown) {
//       this.logger.error(
//         "Erreur lors de l'enregistrement du fichier",
//         error instanceof Error ? error.stack : error,
//       );
//       throw new InternalServerErrorException(
//         `Échec de l'enregistrement du fichier ${file.originalname}`,
//       );
//     }
//   }
// }
