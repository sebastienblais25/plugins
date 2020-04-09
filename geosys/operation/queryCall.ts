import { Connexion } from "../apiConnect";
import { User } from "../user";
import { urlQuery } from "../config/url";


export class QueryCall {
    private _conn: Connexion = new Connexion();
    private _json: any;
    
    /**
     *
     * @param {User} log
     * @param {string} format
     * @param {Boolean} simply
     * @memberof QueryCall
     */
    submitquery(log: User, format: string, simply: Boolean): any {
        return this._conn.connexionAPI(log.getToken(),this._json,log.constructUrl(urlQuery,'?output_format=' + format + '&simplifier=' + simply),'Get');
    }
    /**
     *
     * @param {string} query
     * @memberof QueryCall
     */
    constructJson(query: string): void {
        this._json = {
            'sql': query
        }
    }
    /***** Accessor ******/
    getConn(): Connexion {
        return this._conn;
    }
    setConn(value: Connexion) {
        this._conn = value;
    }
    getjson(): any {
        return this._json;
    }
    setjson(value: any) {
        this._json = value;
    }
}