export interface IFileUploadData {
    accept?: string;
    message?: string;
    showMessage: boolean;
    action: string;
    selectFile?: () => void;
    takeAction?: (file: File) => void;
    notifyProgress?: (percent: number) => void; // registered by component
    cancelAction: () => void;
}
