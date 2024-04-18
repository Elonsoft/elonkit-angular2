export interface ESDropzoneFile {
  id?: number;
  type?: string;
  base64?: string;
  name: string;
  size: number;
  content: File | string;
}

export interface ESDropzoneDefaultOptions {
  accept?: string;
  matIcon?: string;
  svgIcon?: string;
  maxSize?: number;
  type?: 'base64' | 'binary';
  headingTypography?: string;
  subheadingTypography?: string;
}

export interface ESDropzoneValidationError {
  fileName: string;
  error: validationError;
}

interface validationError {
  FILE_TYPE?: boolean;
  FILE_SIZE?: boolean;
}
