/****** Import ******/
import { Extraire } from "../operation/extraire";
import { menuManager } from "./menuManager";
import { login } from '../login';

export class manageController{


    constructor(){};

    //Submit controller
    extrairecontrols(log:login,panel:any/* À enlever */, mapApi:any):void{
        /************ À placer en fonction ou class ***********/
        // TODO: creer la directive avant de compiler le code
        mapApi.agControllerRegister('SubmitCtrl', function($scope){
            //List theme and idut
            /*$scope.theme = ["hydro_50k","corint_250k"];

            $scope.themes = [];
            $scope.themes.hydro_50k = log._idUt[0]._wUnit;
            $scope.themes.corint_250k = log._idUt[1]._wUnit; */




            $scope.IsVisible = false;


            //permet d'afficher ou chacher le formulaire en cliquanr sur le titre
            this.ShowHide = function(){
                $scope.IsVisible = $scope.IsVisible ? false : true;    
            };

            //Envoie le formulaire a l'Api
            this.submitForm = function() { 
                //get all the information of the form into the class
                let ext = new Extraire(
                    (<HTMLInputElement>document.getElementById("env")).value
                    ,(<HTMLInputElement>document.getElementById("theme")).value
                    ,(<HTMLInputElement>document.getElementById("idUt")).value
                    ,(<HTMLInputElement>document.getElementById("clip")).value
                    ,(<HTMLInputElement>document.getElementById("whereclause")).value
                    ,(<HTMLInputElement>document.getElementById("geom")).value);
                
                let apireturn:any = ext.submitForm(log._token);
                if (apireturn.status == 401){
                    alert(apireturn.statusText)
                }else{
                    $scope.IsVisible = false;
                    console.log(log._token);
                }
              
                //alert(this._apireturn.value);    
            };
            
            //Ouvre le fromulaire dans un nouveau panel a changer pour pour mettre dans la classe menu si choisi
            this.openplan = function(){
                let menu:menuManager = new menuManager();

                    
                    let outputPlan:string;

                    
                    outputPlan = menu.planifManager(log,panel,mapApi);

                    panel.body = "<div>"  + outputPlan+ "</div>";
            } 
        });
        /************** ***************/
    }

    planControl(log:login,panel:any/* À enlever */, mapApi:any):void{
        mapApi.agControllerRegister('submitFromP', function($scope){

            //Envoie le fromulaire a l'API
            this.submitFormP = function() { 
                //get all the information of the form into the class
                
                
                /*let apireturn:any = ext.submitForm(this._tokenbearer);
                if (apireturn.status == 401){
                    alert(apireturn.statusText)
                }else{
                    console.log(token);
                }*/
                //alert("hello"/*this._apireturn.value*/);    
            };


            //a changer si choisi pour que çca soit plus interactif
            this.cancelFormP = function(){
                let menu:menuManager = new menuManager();

                let outputExt:string;

                outputExt = menu.extractManager(log,panel,mapApi);
                
                
                
                panel.body = "<div>"  + outputExt+ "</div>";
            }
           
        });
    }


    //Compilateur de HTML avec les variables pour les boutons
    compileTemplate(template,mapApi): JQuery<HTMLElement> {
        let temp = $(template);
        mapApi.$compile(temp);
        return temp;
    }

    
}