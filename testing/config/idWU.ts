

export class idWu{

    _theme:string;
    _wUnit:string[];

    constructor(theme:string, wUnit:string[]){
        this._theme = theme;
        this._wUnit = wUnit;
    }

    getTheme(){
        return this._theme;
    }

    getwUnit(){
        return this._wUnit;
    }

    getspecificwUnit(rank:number){
        return this._wUnit[rank];
    }

    setTheme(theme:string){
        this._theme = theme;
    }

    setwUnit(wUnit:string[]){
        this._wUnit = wUnit;
    }

    setspecificwUnit(wUnit:string, rank:number){
        this._wUnit[rank] = wUnit;
    }

}