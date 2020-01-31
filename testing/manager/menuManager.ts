import { Extraire } from "../operation/extraire";
import { manageButton } from "./ButtonManager";
import { formExtraire } from '../config/html-assets';

export class menuManager{


    constructor(){}

    extractManager(log:any, panel:any, mapApi:any,){
        let list = log.getthemeAcc();
        let listserver = log.getenvAcc();


        

        /************* Extraire ***************/
        let ext = new Extraire('','','','','','');
        let mb = new manageButton();
        //activate the controls for Extraction
        mb.angularcontrols(ext, log._token, mapApi);
        //set the dropdown list for the form
        let ddlEnv = this.interactiveDropDownList(listserver);
        let ddltheme = this.interactiveDropDownList(list);
        

        //add the dropdown list for the form
        let output = formExtraire.replace(/{dropdowntheme}/, ddltheme);
        output = output.replace(/{dropdownenv}/,ddlEnv);

        /******** add the drop down list with the theme selected *********/
        let listiduw = log.getUravail(log._idUt[0].getTheme());
        let ddlid = this.interactiveDropDownList(listiduw);
        this.setDDLidWorkingUnit()
        output = output.replace(/{dropdownid}/,ddlid);

        // TODO: compiler ton code pour que la directive Angular soit associe a ton code.
        // Append element
        mb.compileTemplate(output,mapApi);

        //add the compile template to the panel
        panel.body = output;
    }

    planifManager(log:any, panel:any, mapApi:any){

    }

       //create a drop list for the template
   interactiveDropDownList(list:string[]):string{
    let ddl:string= "";
    for (let i in list) {
        ddl += `<option value="` + list[i] + `">`+ list[i] + `</option>`
    }   ;
    return ddl;
    } 


    setDDLidWorkingUnit():any{
        $("#theme").click(function(){
            alert('hello');
        });
    }




}