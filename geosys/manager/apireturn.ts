
export class ApiReturn {
    private _id: string;
    private _idListeCode: string;
    private _nom: string;
    private _descEn: string;
    private _descFr: string;
    /**
     * Creates an instance of ApiReturn with only an id
     * @param {string} id Id of the response of the API
     * @memberof ApiReturn
     */
    constructor(id:string) {
        this._id = id;
    }
    /**
     * When a call to the API is done with the code. this will set the remaining of the information
     * @param {string} idListCode A code for a list
     * @param {string} nom The name in the db
     * @param {string} descEn English description
     * @param {string} descFr French description
     * @memberof ApiReturn
     */
    setRemaining(idListCode: string, nom: string, descEn: string, descFr: string) {
        this._idListeCode = idListCode;
        this._nom = nom;
        this._descEn = descEn;
        this._descFr = descFr;
    }
    /******* Accessor *******/
    getId() {
        return this._id;
    }

    setId(id: string) {
        this._id = id;
    }

    getnom() {
        return this._nom;
    }

    setnom(nom: string) {
        this._nom = nom
    }
}