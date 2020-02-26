

export class TestingFile{

    _name:string;
    _path:string;

    constructor(name:string, path:string){
        this._name = name;
        this._path = path;
    }

    getName(){
        return this._name;
    }

    setName(name:string){
        this._name =name;
    }

    getPath(){
        return this._path;
    }

    setPath(path:string){
        this._path = path; 
    }
}