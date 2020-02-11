/****** Import ******/
import { manageController } from "./ControllerManager";
import { formExtraireSR,formExtraireP, formPlanifier, formDelivery, topmenu } from '../config/html-assets';
import { User } from '../user';

export class menuManager{

    _compiler:manageController;


    constructor(log:User, panel:any, mapApi:any, config:any){
        //set the manage controller
        this._compiler = new manageController();

        //varaible for the form
        let outputExt:string;
        let outputExtSR:string;
        let outputPlan:string;
        let outputDeli:string;
        let outputTopmenu:string;
        
        let menuprincipal:string;

        //create each form
        outputExt = this.extractManager(log,mapApi);
        outputExtSR = this.extractSRManager(log,mapApi);
        outputPlan = this.planifManager(log,mapApi, config);
        outputDeli = this.deliManager(log,mapApi);
        outputTopmenu = this.topMenuManager(log,mapApi);

        //compile the form together
        menuprincipal = "<div>" + outputTopmenu + outputPlan + outputExt + outputExtSR + outputDeli +"</div>";
        this._compiler.compileTemplate(menuprincipal,mapApi);
        
        //put the form in the panel
        panel.body = menuprincipal;
    }

    extractManager(log:User, mapApi:any):string{
        
        this._compiler.extrairecontrols(log, mapApi);

        //add the dropdown list for the form
        let output = formExtraireP;
        
        return output;
    }

    planifManager(log:User, mapApi:any, config:any):string{

        this._compiler.planControl(log, mapApi, config);

        //add the dropdown list for the form
        let output = formPlanifier;
        
        return output;
    }

    deliManager(log:User, mapApi:any):string{
        
        this._compiler.deliControl(log, mapApi);

        let output = formDelivery;
        //mb.compileTemplate(output,mapApi);
        return output
    }

    topMenuManager(log:User, mapApi:any):string{

        this._compiler.topmenuControl(log, mapApi);

        let output = topmenu;
        //mb.compileTemplate(output,mapApi);
        return output
    }

    extractSRManager(log:User, mapApi:any):string{
        this._compiler.extraireSRcontrols(log, mapApi);

        let output = formExtraireSR;
        return output;

    }
}