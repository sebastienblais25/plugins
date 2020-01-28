

export class Export{
    _Environnement:string;
    _theme:string;
    _idProgramme:string;
    _connectionType:string;
    _pathFile :string;

    constructor(environnement:string, theme:string,idProgramme:string, connectionType:string, pathfile:string){
        this._theme =theme ;
        this._pathFile =pathfile;
        this._idProgramme = idProgramme;
        this._connectionType=connectionType;
        this._Environnement = environnement;
    }

    //form for the export 
    exportForm(){

    }


    //submit the from for export
    submitExportFrom(){

    }




};


export interface Export{


    
};