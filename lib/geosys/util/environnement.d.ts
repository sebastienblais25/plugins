export declare class Environnement {
    _env: string;
    _urlEnv: string;
    constructor(env: string, urlEnv: string);
    getenv(): string;
    setenv(value: string): void;
    geturlEnv_1(): string;
    seturlEnv_1(value: string): void;
}
