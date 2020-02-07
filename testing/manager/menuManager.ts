/****** Import ******/
import { manageController } from "./ControllerManager";
import { formExtraire, formPlanifier, formDelivery, topmenu } from '../config/html-assets';
import { login } from '../login';

export class menuManager{

    _compiler:manageController;


    constructor(log:login, panel:any, mapApi:any, config:any){
        this._compiler = new manageController();

        let outputExt:string;
        let outputPlan:string;
        let outputDeli:string;
        let outputTopmenu:string;
        
        let menuprincipal:string

        outputExt = this.extractManager(log,mapApi);
        outputPlan = this.planifManager(log,mapApi, config);
        outputDeli = this.deliManager(log,mapApi);
        outputTopmenu = this.topMenuManager(log,mapApi);

        menuprincipal = "<div>" + outputTopmenu + outputPlan + outputExt + outputDeli +"</div>";
        this._compiler.compileTemplate(menuprincipal,mapApi)
        
        panel.body = menuprincipal;
    }

    extractManager(log:login, mapApi:any):string{
        
        
        
        this._compiler.extrairecontrols(log, mapApi);

        //add the dropdown list for the form
        let output = formExtraire;
        
        return output;
    }

    planifManager(log:login, mapApi:any, config:any):string{

        

        this._compiler.planControl(log, mapApi, config);

        //add the dropdown list for the form
        let output = formPlanifier;
        
        return output;
    }

    deliManager(log:login, mapApi:any):string{
        let listserver = log.getenvAcc();
        
        this._compiler.deliControl(log, mapApi)

        let output = formDelivery;
        //mb.compileTemplate(output,mapApi);
        return output
    }

    topMenuManager(log:login, mapApi:any):string{

        this._compiler.topmenuControl(log, mapApi)

        let output = topmenu;
        //mb.compileTemplate(output,mapApi);
        return output
    }






}