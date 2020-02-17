export declare class connexion {
    constructor();
    connexionAPI(token: string, jsonstring: any, urlgoto: string, typeConn: string): any;
    connexionAPILogin(urlgoto: string, header: any): any;
    connexionAPIPost(token: string, jsonstring: string, urlgoto: string, typeConn: string): any;
    connexionAPIFormData(token: string, formdata: any, urlgoto: string, typeConn: string): any;
}
