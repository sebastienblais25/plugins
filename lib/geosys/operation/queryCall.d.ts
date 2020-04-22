import { Connexion } from "../apiConnect";
import { User } from "../user";
export declare class QueryCall {
    private _conn;
    private _json;
    /**
     * Send the query top the API
     * @param {User} log
     * @param {string} format
     * @param {Boolean} simply
     * @memberof QueryCall
     */
    submitquery(log: User, format: string, simply: boolean): any;
    /**
     * Construct the json for the query
     * @param {string} query
     * @memberof QueryCall
     */
    constructJson(query: string): void;
    /***** Accessor ******/
    getConn(): Connexion;
    setConn(value: Connexion): void;
    getjson(): any;
    setjson(value: any): void;
}
