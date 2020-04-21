

export class Environnement{
    _env: string;
    _urlEnv: string;
    

    constructor(env:string,urlEnv:string){
        this._env = env;
        this._urlEnv = urlEnv;
    }


    getenv(): string {
        return this._env;
    }
    setenv(value: string) {
        this._env = value;
    }
    
    geturlEnv_1(): string {
        return this._urlEnv;
    }
    seturlEnv_1(value: string) {
        this._urlEnv = value;
    }

};