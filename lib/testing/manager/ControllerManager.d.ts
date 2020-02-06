import { login } from '../login';
export declare class manageController {
    constructor();
    planControl(log: login, mapApi: any, config: any): void;
    extrairecontrols(log: login, mapApi: any): void;
    deliControl(log: login, mapApi: any): void;
    topmenuControl(log: login, mapApi: any): void;
    compileTemplate(template: any, mapApi: any): JQuery<HTMLElement>;
}
