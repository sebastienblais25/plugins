import { Connexion } from "../apiConnect";
import { User } from "../user";
import { urlQuery } from "../config/url";


export class QueryCall {
    private _conn: Connexion = new Connexion();
    private _json: any;
    
    /**
     * Send the query top the API
     * @param {User} log
     * @param {string} format
     * @param {Boolean} simply
     * @memberof QueryCall
     */
    submitquery(log: User, format: string, simply: boolean): any {
        return this._conn.connexionAPI(log.getToken(),this._json,/*"http://127.0.0.1:8080/geosys-api/v1/suivi-prod/requete-bd?output_format=geojson&simplifier=True"*/log.constructUrl(urlQuery,'?output_format=' + format + '&simplifier=' + simply),'Post');
    }
    /**
     * Construct the json for the query
     * @param {string} query
     * @memberof QueryCall
     */
    constructJson(query: string): void {
        this._json = {
            'sql': query
        }
        this._json = JSON.stringify(this._json);
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