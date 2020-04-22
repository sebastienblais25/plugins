import { User } from '../user';
export declare class FileController {
    constructor();
    /**
     * Create the first panel for the with the root
     * @param {User} log for the token and other useful tools
     * @param {*} mapApi The object of the API
     * @param {FileMana} tfm the object File Manager to keep where you are in a repository
     * @memberof FileManagerController
     */
    fileManagercontrols(log: User, mapApi: any): void;
}
export interface FileController {
    panel: any;
    panel1: any;
}
