export type USnackbarVariant = 'default' | 'success' | 'error';

export interface ISnackbarData {
  text: string;
  icon?: string;
  matIcon?: string;
  variant?: USnackbarVariant;
  size?: USnackbarSize;
  dismissAfter?: number;
  callback?: () => void;
  actionText?: string;
}

export type USnackbarSize = 's' | 'm' | 'l';
