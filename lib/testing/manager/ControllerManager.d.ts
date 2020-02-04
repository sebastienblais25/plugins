import { login } from '../login';
export declare class manageController {
    constructor();
    extrairecontrols(log: login, panel: any, mapApi: any): void;
    listeExtraire(log: login, mapApi: any): any;
    planControl(log: login, panel: any, mapApi: any): void;
    compileTemplate(template: any, mapApi: any): JQuery<HTMLElement>;
}
