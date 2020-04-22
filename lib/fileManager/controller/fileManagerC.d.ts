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
    fileManagercontrols(token: string, mapApi: any, tfm: FileMana, panel: any, panel1: any): void;
    /**
     * Create the panel body when a folder is clicked
     * @param {User} log User tools
     * @param {*} mapApi the map Object
     * @param {FileMana} tfm to keep track where you are
     * @param {*} panel the panel to add the body
     * @memberof FileManagerController
     */
    FileManaManager(token: string, mapApi: any, tfm: FileMana, panel: any, panel1: any): void;
    /**
     * The panel to name the new folder and add the new folder in thje directory
     * @param {string} token
     * @param {FileMana} tfm
     * @param {*} mapApi
     * @memberof FileManagerController
     */
    addingFolder(token: string, tfm: FileMana, mapApi: any, panel: any, panel1: any): void;
}
export interface FileManagerController {
    panel: any;
    panel1: any;
}
