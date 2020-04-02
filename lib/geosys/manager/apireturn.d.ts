export declare class ApiReturn {
    private _id;
    private _idListeCode;
    private _nom;
    private _descEn;
    private _descFr;
    /**
     * Creates an instance of ApiReturn with only an id
     * @param {string} id Id of the response of the API
     * @memberof ApiReturn
     */
    constructor(id: string);
    /**
     * When a call to the API is done with the code. this will set the remaining of the information
     * @param {string} idListCode A code for a list
     * @param {string} nom The name in the db
     * @param {string} descEn English description
     * @param {string} descFr French description
     * @memberof ApiReturn
     */
    setRemaining(idListCode: string, nom: string, descEn: string, descFr: string): void;
    /******* Accessor *******/
    getId(): string;
    setId(id: string): void;
    getnom(): string;
    setnom(nom: string): void;
}
