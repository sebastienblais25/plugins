/****** Import ******/
import { Extraire } from "../operation/extraire";
import { menuManager } from "./menuManager";
import { login } from '../login';
import { planifier } from '../operation/planifier';

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
                    ,this.selectedItemA
                    ,this.selectedItemB
                    ,(<HTMLInputElement>document.getElementById("clip")).value
                    ,(<HTMLInputElement>document.getElementById("whereclause")).value
                    ,(<HTMLInputElement>document.getElementById("geom")).value);
                
                let apireturn:any = ext.submitForm(log._token);
                if (apireturn != 'success'){
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



            /************** interactive List ***************/

            this.selectedItemA = '';
            this.selectedItemB = '';

            this.itemsA = [];
                /*{ name: 'item 1', value: 'value1' },
                { name: 'item 2', value: 'value2' },
                { name: 'item 3', value: 'value3' }
            ];*/

            for (let i in log._themeAcc){
                this.itemsA += {name : log._themeAcc[i] , value: log._themeAcc[i]}
            }

            const newList = {
                value1: [{ name: 'a', value: 'a1' }, { name: 'b', value: 'b1' }, { name: 'c', value: 'c1' }],
                value2: [{ name: '1', value: '11' }, { name: '2', value: '21' }, { name: '3', value: '31' }],
                value3: [{ name: '@', value: '@1' }, { name: '#', value: '#1' }, { name: '$', value: '$1' }]
            };

            this.itemsB = [];

            this.setList = () => {
                console.log(`set: ${this.selectedItemA}`);

                // populate list b with new items
                this.itemsB.length = 0;
                newList[this.selectedItemA].forEach(item => this.itemsB.push(item))
            }
        });
    }

    listeExtraire(log:login, mapApi:any):any{
        mapApi.agControllerRegister('autoCtrl', function($scope){
            
        });

    }

    planControl(log:login,panel:any/* À enlever */, mapApi:any):void{
        mapApi.agControllerRegister('submitFromP', function($scope){

            //Envoie le fromulaire a l'API
            this.submitFormP = function() { 
                //get all the information of the form into the class
                
                let plan:planifier = new planifier(
                    (<HTMLInputElement>document.getElementById("envp")).value,
                    (<HTMLInputElement>document.getElementById("themep")).value,
                    (<HTMLInputElement>document.getElementById("idUtp")).value,
                    (<HTMLInputElement>document.getElementById("ttv")).value,
                    (<HTMLInputElement>document.getElementById("classes")).value,
                    (<HTMLInputElement>document.getElementById("dfp")).value,
                    (<HTMLInputElement>document.getElementById("wherep")).value,
                    (<HTMLInputElement>document.getElementById("geomp")).value);
                //alert(log.gettoken());
                let apireturn:any = plan.submitForm(log.gettoken());
                
                if (apireturn != undefined){
                    alert(apireturn + ' 4');
                    console.log(apireturn);
                }else{
                    console.log(log.gettoken());
                }   
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