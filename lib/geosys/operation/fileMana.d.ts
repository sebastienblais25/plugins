import { User } from '../user';
import { Connexion } from '../apiConnect';
export declare class FileMana {
    private _conn;
    private _breadcrumbs;
    private _lastFolder;
    private _liveFolder;
    private _nextFolder;
    private _value;
    private _list;
    /**
     *Creates an instance of FileMana.
     * @param {string} [nextFolder='root']
     * @memberof FileMana
     */
    constructor(nextFolder?: string);
    /**
     * obtain the structure of a folder with a path send
     * @param {User} log for the token
     * @memberof FileMana
     */
    obtainArbo(log: User): void;
    /**
     * set the url for the navigation in the file manager
     * @returns {string} return the url needed
     * @memberof FileMana
     */
    setNavigation(): string;
    /**
     * build a list of folder with the return of the API
     * @returns return a list of folder
     * @memberof FileMana
     */
    buildFolderList(): any[];
    /**
     * build a list of file with the return of the API
     * @returns return a list of file
     * @memberof FileMana
     */
    buildFileList(): any[];
    /**
     * Build the template for the file manager
     * @returns {string} return a template
     * @memberof FileMana
     */
    buildUI(): string;
    /**
     * build a clickable breacrumbs for the navigations
     * @returns return a string for the templates
     * @memberof FileMana
     */
    buildClickablebreadcrumbs(): string;
    /**
     * set the path needed to get into the good folder
     * @param {string} rank wich folder we want to go in
     * @memberof FileMana
     */
    setbreacrumbsForNav(rank: string): void;
    /**
     * set a formdata to the Api to upload a file
     * @param {string} path the path of the file
     * @param {string} token the token for the connection
     * @memberof FileMana
     */
    uploadfile(path: string, log: User, file: File): void;
    /**
     * receive a blob dorm the APi to save the file into the download repository
     * @param {string} nameFile name of the file
     * @param {string} path the path of the file
     * @param {string} token the token for the connection
     * @memberof FileMana
     */
    downloadFile(nameFile: string, path: string, log: User): void;
    /**
     * to delete a file in the repository S3
     * @param {string} nameFile name of the file
     * @param {string} path the path of the file
     * @param {string} token the token for the connection
     * @memberof FileMana
     */
    deleteFile(nameFile: string, path: string, log: User): void;
    /**
     * Download a folder with an API call and a zip file
     * @param {string} nameFolder take the name of the folder
     * @param {string} path take the path of the folder
     * @param {string} token put the token for the API
     * @memberof FileMana
     */
    downloadFolder(nameFolder: string, path: string, log: User): void;
    /**
     * Delete a folder in S/ with an API call
     * @param {string} nameFolder the name of the folder to delete
     * @param {string} path
     * @param {string} token
     * @memberof FileMana
     */
    deleteFolder(nameFolder: string, path: string, log: User): void;
    /**
     * Create a folder in S3 with an API call
     * @param {string} pathforfolder the path to add a folder
     * @param {string} token the token for the API
     * @param {string} foldername the new folder name
     * @memberof FileMana
     */
    createFolder(pathforfolder: string, log: User, foldername: string): void;
    /**
     * Maybe Added feature in the future
     * @memberof FileMana
     */
    uploadFolder(): void;
    /******* Accessor *******/
    getConn(): Connexion;
    setConn(value: Connexion): void;
    getBreadcrumbs(): string;
    setBreadcrumbs(value: string): void;
    getLastFolder(): string;
    setLastFolder(value: string): void;
    getLiveFolder(): string;
    setLiveFolder(value: string): void;
    getNextFolder(): string;
    setNextFolder(next: string): void;
    getValue(): any;
    setValue(value: any): void;
    getList(): any[];
    setList(value: any): void;
}
