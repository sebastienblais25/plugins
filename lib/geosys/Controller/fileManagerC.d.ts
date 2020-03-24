import { User } from "../user";
import { FileMana } from '../operation/fileMana';
export declare class FileManagerController {
    constructor();
    fileManagercontrols(log: User, mapApi: any, tfm: FileMana): void;
    FileManaManager(log: User, mapApi: any, tfm: FileMana, panel: any): void;
    addingFolder(log: User, tfm: FileMana, mapApi: any): void;
}
export interface FileManagerController {
    panel: any;
    panel1: any;
}
