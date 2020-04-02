import { User } from "../user";
import { FileMana } from '../operation/fileMana';
export declare class FileManagerController {
    constructor();
    /**
     * Create the first panel for the with the root
     * @param {User} log for the token and other useful tools
     * @param {*} mapApi The object of the API
     * @param {FileMana} tfm the object File Manager to keep where you are in a repository
     * @memberof FileManagerController
     */
    fileManagercontrols(log: User, mapApi: any, tfm: FileMana): void;
    /**
     * Create the panel body when a folder is clicked
     * @param {User} log User tools
     * @param {*} mapApi the map Object
     * @param {FileMana} tfm to keep track where you are
     * @param {*} panel the panel to add the body
     * @memberof FileManagerController
     */
    FileManaManager(log: User, mapApi: any, tfm: FileMana, panel: any): void;
    addingFolder(log: User, tfm: FileMana, mapApi: any): void;
}
export interface FileManagerController {
    panel: any;
    panel1: any;
}
