export declare class connexion {
    constructor();
    /**
     *the connexion to the Api for the login
     * @param {string} urlgoto the url for the login
     * @param {*} header the header with the username and the password
     * @returns {*} return the infromation of the user
     * @memberof connexion
     */
    connexionAPILogin(urlgoto: string, header: any): any;
    /**
     * connection to the Api with ajax and promises
     * @param {string} token the token for the connection
     * @param {*} jsonstring the body in json
     * @param {string} urlgoto the url to jion the API
     * @param {string} typeConn the type of connection Get, Post, put ...
     * @returns {*} return all the information we get from the Api
     * @memberof connexion
     */
    connexionAPI(token: string, jsonstring: any, urlgoto: string, typeConn: string, optEnv?: string): any;
    /**
      * connection to the Api with ajax and promises for files
      * @param {string} token the token for the connection
      * @param {*} jsonstring the body in formdata (File)
      * @param {string} urlgoto the url to join the API
      * @param {string} typeConn the type of connection Get, Post, put ...
      * @returns {*} return all the information we get from the Api
     * @memberof connexion
     */
    connexionAPIFormData(token: string, formdata: any, urlgoto: string, typeConn: string, optEnv?: string): any;
    connexionAPIFileMAnager(token: string, urltogo: string): any;
    connexionAPIFileDownloadDelete(token: string, urltogo: string, operatio: string, content: string): any;
    connexionAPIFileUplaod(token: string, urltogo: string, file: File): any;
}
