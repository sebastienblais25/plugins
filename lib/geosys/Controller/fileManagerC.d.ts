import { User } from "../user";
import { FileMana } from '../FileMana';
export declare class FileManagerController {
    constructor();
    fileManagercontrols(log: User, mapApi: any, tfm: FileMana): void;
    FileManaManager(log: User, mapApi: any, tfm: FileMana, panel: any): void;
}
export interface FileManagerController {
    panel: any;
}
