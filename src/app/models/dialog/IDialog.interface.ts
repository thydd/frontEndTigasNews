export type DialogVariant =
  | 'createDialog'
  | 'updateDialog'
  | 'deleteDialog';

export interface IDialog {
  variant: DialogVariant;
  title: string;
  message?: string;

  showCancel?: boolean;
}