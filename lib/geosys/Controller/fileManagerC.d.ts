import { User } from "../user";
import { TestFile } from '../testFile';
export declare class FileManagerController {
    constructor();
    fileManagercontrols(log: User, mapApi: any, tfm: TestFile): void;
    testFileManager(log: User, mapApi: any, tfm: TestFile, panel: any): void;
}
export interface FileManagerController {
    panel: any;
}
