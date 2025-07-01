export type File = {
  fieldname: string;
  originalname: string;
  encoding: '7bit';
  mimetype: string;
  buffer: Buffer | undefined;
  size: number;
};

export interface UploadedFile extends File {
  width: number | undefined;
  height: number | undefined;
}

export interface FichierObj {
  nom: string;
  description: string;
  dateModification: number;
  typeMime: string;
  tailleEnOctets: number;
  originalUrl: string;
  originalW: number | undefined;
  originalH: number | undefined;
  apercu320Url: string;
  apercu320W: number | undefined;
  apercu320H: number | undefined;
}

export interface FileUploadOptions {
  onlySaveThumbnail: boolean;
}

export type UploadedFileToServer = UploadedFile & {
  location: string;
};

export class ResizeFormat {
  static readonly Size320x240 = {
    name: '320x240',
    width: 320,
    height: 240,
  };
}

export const genericThumbnailFiles = new Map<string, UploadedFileToServer>([
  [
    '.pdf',
    {
      originalname: 'pdf.png',
      location: 'generic/pdf.png',
      width: ResizeFormat.Size320x240.width,
      height: ResizeFormat.Size320x240.height,
      size: 6647,
      buffer: undefined,
      encoding: '7bit',
      fieldname: '',
      mimetype: 'image/png',
    },
  ],
  [
    '.docx',
    {
      originalname: 'docx.png',
      location: 'generic/docx.png',
      width: ResizeFormat.Size320x240.width,
      height: ResizeFormat.Size320x240.height,
      size: 2458,
      buffer: undefined,
      encoding: '7bit',
      fieldname: '',
      mimetype: 'image/png',
    },
  ],
  [
    '.mp3',
    {
      originalname: 'audio.png',
      location: 'generic/audio.png',
      width: ResizeFormat.Size320x240.width,
      height: ResizeFormat.Size320x240.height,
      size: 2458,
      buffer: undefined,
      encoding: '7bit',
      fieldname: '',
      mimetype: 'audio/mpeg',
    },
  ],
]);
