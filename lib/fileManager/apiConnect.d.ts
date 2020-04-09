export declare class Connexion {
    constructor();
    /**
     * Get the structure of a repository from S3
     * @param {string} token token of the user
     * @param {string} urltogo the url for the API
     * @returns {*} the list of folder and file
     * @memberof Connexion
     */
    connexionAPIFileManager(token: string, urltogo: string, operation: string, content: string, file?: any): any;
    connexionAPIFileManagerTestDownload(token: string, urltogo: string, operation: string, content: string, file?: any): any;
}
