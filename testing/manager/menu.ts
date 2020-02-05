import { login } from "../login";
import { menuManager } from "./menuManager";


export class MenuPrincipal{

    constructor(){};

    createMenuPrincipal(log:login, panel:any, mapApi:any):string{
        let menu:menuManager = new menuManager();

        let outputExt:string;
        let outputPlan:string;
        let outputDeli:string;
        let outputTopmenu:string;
        
        let menuprincipal:string
        

        outputExt = menu.extractManager(log,panel,mapApi);
        outputPlan = menu.planifManager(log,panel,mapApi);
        outputDeli = menu.deliManager(log,panel,mapApi);
        outputTopmenu = menu.topMenuManager(log,panel,mapApi);

        menuprincipal = "<div>" + outputTopmenu + outputPlan + outputExt + outputDeli +"</div>";

        return menuprincipal;
    }

}
