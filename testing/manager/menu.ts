import { login } from "../login";
import { menuManager } from "./menuManager";
import { manageController } from "./ControllerManager";


export class MenuPrincipal{

    constructor(){};

    createMenuPrincipal(log:login, panel:any, mapApi:any, config:any):string{
        let menu:menuManager = new menuManager();
        let compiler:manageController = new manageController();

        let outputExt:string;
        let outputPlan:string;
        let outputDeli:string;
        let outputTopmenu:string;
        
        let menuprincipal:string
        

        outputExt = menu.extractManager(log,mapApi);
        outputPlan = menu.planifManager(log,mapApi, config);
        outputDeli = menu.deliManager(log,mapApi);
        outputTopmenu = menu.topMenuManager(log,mapApi);

        menuprincipal = "<div>" + outputTopmenu + outputPlan + outputExt + outputDeli +"</div>";
        compiler.compileTemplate(menuprincipal,mapApi)

        return menuprincipal;
    }

}
