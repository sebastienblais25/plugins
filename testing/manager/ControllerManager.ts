/****** Import ******/
import { Extraire } from "../operation/extraire";
import { menuManager } from "./menuManager";
import { login } from '../login';
import { planifier } from '../operation/planifier';

export class manageController{


    constructor(){};

    
    planControl(log:login,panel:any/* À enlever */, mapApi:any):void{
        mapApi.agControllerRegister('submitFromP', function($scope){
            $scope.IsVisible = false;

            //permet d'afficher ou chacher le formulaire en cliquanr sur le titre
            this.ShowHide = function(){
                if(log._environnement!= ''){
                    $scope.IsVisible = $scope.IsVisible ? false : true; 
                }    
            };

            //Envoie le fromulaire a l'API
            this.submitFormP = function() { 
                //get all the information of the form into the class
                
                let plan:planifier = new planifier(
                    this.selectedItemC,
                    (<HTMLInputElement>document.getElementById("idUt")).value,
                    (<HTMLInputElement>document.getElementById("ttv")).value,
                    (<HTMLInputElement>document.getElementById("classes")).value,
                    (<HTMLInputElement>document.getElementById("dfp")).value,
                    (<HTMLInputElement>document.getElementById("wherep")).value,
                    (<HTMLInputElement>document.getElementById("geomp")).value);
                //alert(log.gettoken());
                let apireturn:any = plan.submitForm(log);
                
                if (apireturn != undefined){
                    alert(apireturn + ' 4');
                    console.log(apireturn);
                }else{
                    console.log(log.gettoken());
                    $scope.IsVisible = false;
                }   
            };
            /************** interactive List ***************/

            this.selectedItemC = '';
            //this.selectedItemD = '';

            this.itemsC = [];

            for (let i in log._themeAcc){
                this.itemsC.push({name : log._themeAcc[i] , value: log._themeAcc[i]});
            }
            
            this.setList = () => {
                console.log(`set: ${this.selectedItemC}`);
                let today = new Date();
                let dd:string = String(today.getDate());
                let mm:string = String(today.getMonth() + 1); //January is 0!
                let yyyy:string = String(today.getFullYear());
                if(dd.length < 2){
                    dd = '0'+dd;
                }
                if(mm.length < 2){
                    mm = '0'+mm;
                }
                // populate list b with new items
                this.idut = this.selectedItemC + '_'+ dd + mm + yyyy + '_';
                //newList[this.selectedItemA].forEach(item => this.itemsB.push(item))
            }
        });
    }

    //Submit controller
    extrairecontrols(log:login,panel:any/* À enlever */, mapApi:any, open?:boolean):void{
        /************ À placer en fonction ou class ***********/
        // TODO: creer la directive avant de compiler le code
        mapApi.agControllerRegister('SubmitCtrl', function($scope){
            
            $scope.IsVisible = false;

            //permet d'afficher ou chacher le formulaire en cliquanr sur le titre
            this.ShowHide = function(){
                if(log._environnement!= ''){
                    $scope.IsVisible = $scope.IsVisible ? false : true; 
                }  
            };

            //Envoie le formulaire a l'Api
            this.submitForm = function() { 
                //get all the information of the form into the class
                //alert(this.selectedItemA + this.selectedItemB) 

                let ext = new Extraire(
                     this.selectedItemA
                    ,this.selectedItemB
                    ,(<HTMLInputElement>document.getElementById("clip")).value
                    ,(<HTMLInputElement>document.getElementById("whereclause")).value
                    ,(<HTMLInputElement>document.getElementById("geom")).value);
                
                let apireturn:any = ext.submitForm(log);
                if (apireturn != 'success'){
                    alert(apireturn.statusText)
                }else{
                    $scope.IsVisible = false;
                    console.log(log._token);
                }
              
                //alert(this._apireturn.value);    
            };
            
            //test
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
            this.selectedItemEN = '';


            this.itemsEN = [];

            for (let i in log._envAcc){
                this.itemsEN.push({name : log._envAcc[i] , value: log._envAcc[i]});
            }


            this.itemsA = [];

            for (let i in log._themeAcc){
                this.itemsA.push({name : log._themeAcc[i] , value: log._themeAcc[i]});
            }

            this.itemsB = [];

            //création de la liste pour les unité de travail
            this.setList = () => {
                console.log(`set: ${this.selectedItemA}`);

                // populate list b with new items
                this.itemsB.length = 0;
                let list:any = log.setidUtToDDL(this.selectedItemA)
                for (let i in list){
                    this.itemsB.push(list[i])
                }
                //newList[this.selectedItemA].forEach(item => this.itemsB.push(item))
            }
        });
    }

    deliControl(log:login,panel:any/* À enlever */, mapApi:any):void{
        mapApi.agControllerRegister('submitFromD', function($scope){

            $scope.IsVisible = false;

            //permet d'afficher ou chacher le formulaire en cliquanr sur le titre
            this.ShowHide = function(){
                if(log._environnement!= ''){
                    $scope.IsVisible = $scope.IsVisible ? false : true; 
                }    
            };

            //Envoie le fromulaire a l'API
            /*this.submitFormP = function() { 
                //get all the information of the form into the class
                
                let plan:planifier = new planifier(
                    (<HTMLInputElement>document.getElementById("envp")).value,
                    this.selectedItemC,
                    this.selectedItemD,
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
            };*/


            /************** interactive List ***************/

            this.selectedItemE = '';
            this.selectedItemF = '';
            this.selectedItemEND = '';


            this.itemsEND = [];

            for (let i in log._envAcc){
                this.itemsEND.push({name : log._envAcc[i] , value: log._envAcc[i]});
            }


            this.itemsE = [];

            for (let i in log._themeAcc){
                this.itemsE.push({name : log._themeAcc[i] , value: log._themeAcc[i]});
            }

            this.itemsF = [];

            this.setList = () => {
                console.log(`set: ${this.selectedItemE}`);

                // populate list b with new items
                this.itemsF.length = 0;
                let list:any = log.setidUtToDDL(this.selectedItemE)
                for (let i in list){
                    this.itemsF.push(list[i])
                }
                //newList[this.selectedItemA].forEach(item => this.itemsB.push(item))
            }
           
        });



    }


    topmenuControl(log:login,panel:any/* À enlever */, mapApi:any){
        mapApi.agControllerRegister('topmenuCtrl', function($scope){

            /************** interactive List ***************/
            
            this.selectedItemENT = '';

            this.itemsENT = [];

            for (let i in log._envAcc){
                this.itemsENT.push({name : log._envAcc[i] , value: log._envAcc[i]});
            }
            this.setEnv = () => {
                log._environnement = this.selectedItemENT;
                if(log._environnement === 'Tst')
                    $scope.bgEnv = {
                        "background-color" : "purple", 
                    }
                else if(log._environnement === 'Dev'){
                    $scope.bgEnv = {
                        "background-color" : "pink", 
                    }
                }else{
                    $scope.bgEnv = {
                        "background-color" : "white", 
                    }
                }
                //alert(log._environnement);
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