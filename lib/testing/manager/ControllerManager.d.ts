import { login } from '../login';
export declare class manageController {
    constructor();
    planControl(log: login, panel: any, mapApi: any): void;
    extrairecontrols(log: login, panel: any, mapApi: any): void;
    deliControl(log: login, panel: any, mapApi: any): void;
    compileTemplate(template: any, mapApi: any): JQuery<HTMLElement>;
}
