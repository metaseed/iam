export interface IFileUploadData {
    accept: string;
    message: string;
    action: string;
    selectFile: () => void;
    takeAction: (file: File, notifyProgress: (percent: number) => void) => void;
    cancelAction: () => void;
}