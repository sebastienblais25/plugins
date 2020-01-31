import { Extraire } from "../operation/extraire";

export class manageButton{


    constructor(){};

    //Submit controller
    angularcontrols(ext:any, token:string, mapApi):void{
        /************ À placer en fonction ou class ***********/
        // TODO: creer la directive avant de compiler le code
        mapApi.agControllerRegister('SubmitCtrl', function($scope){
            this.submitForm = function() { 
                //get all the information of the form into the class
                ext = new Extraire(
                    (<HTMLInputElement>document.getElementById("env")).value
            ,(<HTMLInputElement>document.getElementById("theme")).value
            ,(<HTMLInputElement>document.getElementById("idUt")).value
            ,(<HTMLInputElement>document.getElementById("clip")).value
            ,(<HTMLInputElement>document.getElementById("whereclause")).value
            ,(<HTMLInputElement>document.getElementById("geom")).value);
                
                let apireturn:any = ext.submitForm(this._tokenbearer);
                if (apireturn.status == 401){
                    alert(apireturn.statusText)
                }else{
                    console.log(token);
                }
                //alert(this._apireturn.value);    
            };
           
        });
        /************** ***************/
    }

    compileTemplate(template,mapApi): JQuery<HTMLElement> {
        let temp = $(template);
        mapApi.$compile(temp);
        return temp;
    }

    
}