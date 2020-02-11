/****** Import ******/
import { Extraire } from "../operation/extraire";
import { User } from '../user';
import { planifier } from '../operation/planifier';
import { PanelManager } from "../Drawing/panel-manager";

export class manageController{


    constructor(){};

    
    planControl(log:User, mapApi:any, config:any):void{
        mapApi.agControllerRegister('submitFromP', function($scope){
            const that = this;
            $scope.IsVisible = false;

            //permet d'afficher ou chacher le formulaire en cliquanr sur le titre
            this.ShowHide = function(){
                if(log._environnementSel!= ''){
                    $scope.IsVisible = $scope.IsVisible ? false : true; 
                }    
            };

            //Envoie le fromulaire a l'API
            this.submitFormP = function() { 


                //get all the information of the form into the class
                let listofclass = []
                for(let i in this.classes){
                    if(this.classes[i].wanted ==true){
                        listofclass.push(this.classes[i].name);
                    }
                }
                let plan:planifier = new planifier(
                    this.selectedItemC,
                    (<HTMLInputElement>document.getElementById("idUt")).value,
                    this.selectedItemD,
                    listofclass,
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
            this.selectedItemD = '';

            this.itemsC = [];

            for (let i in log._themeAcc){
                this.itemsC.push({name : log._themeAcc[i] , value: log._themeAcc[i]});
            }

            //List of working type
            this.itemsD = [];
            //the group of classes for a theme
            this.classes = [];
            
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

                //populate the working type list
                this.itemsD.length = 0;
                this.itemsD = log.setworkingtype(this.selectedItemC);


                /** liste de classes **/
                log.getlistofclasses(this.selectedItemC);
                this.classes.length = 0;
                let list= [];
                //create the list with name and varaible for the checkbox
                for(let i in log._classeslist){
                    list.push( { name: log._classeslist[i] , wanted: false });
                }
                //add the new list in list for the template
                for (let i in list){
                    this.classes.push(list[i])
                }
            }


            this.toggleAll = () => {
                if( this.classes[0].wanted === true){
                    for(let i in this.classes){
                        this.classes[i].wanted = false;
                    }  
                }else{
                    for(let i in this.classes){
                        this.classes[i].wanted = true;
                    }
                }
            }

            let count:number = 0;
            
            /*this.toggleDraw = () => {
                
                if (count == 0){
                    let toolbar:PanelManager = new PanelManager(mapApi,config);
                    count ++;
                }
                (<any>document).getElementsByClassName('rv-mapnav-draw-content')[0].style.display = this.checkTool? 'none' : 'block';
            }*/

        });
    }

    //Submit controller
    extrairecontrols(log:User, mapApi:any):void{
        /************ À placer en fonction ou class ***********/
        // TODO: creer la directive avant de compiler le code
        mapApi.agControllerRegister('SubmitCtrl', function($scope){
            
            $scope.IsVisible = false;

            //permet d'afficher ou chacher le formulaire en cliquanr sur le titre
            this.ShowHide = function(){
                if(log._environnementSel!= ''){
                    $scope.IsVisible = $scope.IsVisible ? false : true; 
                }  
            };

            //Envoie le formulaire a l'Api
            this.submitForm = function() { 
                //get all the information of the form into the class
                let ext = new Extraire(
                     this.selectedItemA
                    ,this.selectedItemB);
                
                let apireturn:any = ext.submitForm(log);
                if (apireturn != 'success'){
                    alert(apireturn.statusText)
                }else{
                    $scope.IsVisible = false;
                    console.log(log._token);
                }
              
                //alert(this._apireturn.value);    
            };
            

            /************** interactive List ***************/

            this.selectedItemA = '';
            this.selectedItemB = '';

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
                let list:any = log.setidUTtheme(this.selectedItemA)
                for (let i in list){
                    this.itemsB.push(list[i])
                }
            }
        });
    }

    extraireSRcontrols(log:User, mapApi:any):void{
        /************ À placer en fonction ou class ***********/
        // TODO: creer la directive avant de compiler le code
        mapApi.agControllerRegister('SubmitExCtrl', function($scope){
            
            $scope.IsVisible = false;

            //permet d'afficher ou chacher le formulaire en cliquanr sur le titre
            this.ShowHide = function(){
                if(log._environnementSel!= ''){
                    $scope.IsVisible = $scope.IsVisible ? false : true; 
                }  
            };

            //Envoie le formulaire a l'Api
            this.submitSRForm = function() { 
                //get all the information of the form into the class
                let listofclass = []
                for(let i in this.classes){
                    if(this.classes[i].wanted ==true){
                        listofclass.push(this.classes[i].name);
                    }
                }
                let siClip:string;
                if(this.cbClip == true){
                    siClip = 'oui';
                }else{
                    siClip = 'non';
                }

                let extsr = new Extraire(
                     this.selectedItemA);
                extsr.setInfoForSR(listofclass,
                    siClip,
                    (<HTMLInputElement>document.getElementById("whereclause")).value,
                    (<HTMLInputElement>document.getElementById("geom")).value)
                
                let apireturn:any = extsr.submitForm(log);
                if (apireturn != 'success'){
                    alert(apireturn.statusText)
                }else{
                    $scope.IsVisible = false;
                    console.log(log._token);
                }
              
                //alert(this._apireturn.value);    
            };
            

            /************** interactive List ***************/

            this.selectedItemA = '';
            
            this.itemsA = [];

            for (let i in log._themeAcc){
                this.itemsA.push({name : log._themeAcc[i] , value: log._themeAcc[i]});
            }

            this.classes = [];

            //création de la liste pour les unité de travail
            this.setList = () => {
                log.getlistofclasses(this.selectedItemC);
                this.classes.length = 0;
                let list= [];
                //create the list with name and varaible for the checkbox
                for(let i in log._classeslist){
                    list.push( { name: log._classeslist[i] , wanted: false });
                }
                //add the new list in list for the template
                for (let i in list){
                    this.classes.push(list[i])
                }
            }

            this.toggleAll = () => {
                if( this.classes[0].wanted === true){
                    for(let i in this.classes){
                        this.classes[i].wanted = false;
                    }  
                }else{
                    for(let i in this.classes){
                        this.classes[i].wanted = true;
                    }
                }
            }

            this.ifClip = () => {

            }
        });
    }

    deliControl(log:User, mapApi:any):void{
        mapApi.agControllerRegister('submitFromD', function($scope){

            $scope.IsVisible = false;

            //permet d'afficher ou chacher le formulaire en cliquanr sur le titre
            this.ShowHide = function(){
                if(log._environnementSel!= ''){
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

            this.itemsE = [];

            for (let i in log._themeAcc){
                this.itemsE.push({name : log._themeAcc[i] , value: log._themeAcc[i]});
            }

            this.itemsF = [];

            this.setList = () => {
                console.log(`set: ${this.selectedItemE}`);

                // populate list b with new items
                this.itemsF.length = 0;
                let list:any = log.setidUTtheme(this.selectedItemE)
                for (let i in list){
                    this.itemsF.push(list[i])
                }
                //newList[this.selectedItemA].forEach(item => this.itemsB.push(item))
            }
           
        });



    }

    
    /**
     * Change the environnement of the user and change the color of the backgournd if not PRO
     *
     * @param {User} log getting all the information of the user and getting the envrionnemnt h'es already in
     * @param {*} mapApi need the mapApi for setting the controller.
     * @memberof manageController
     */
    topmenuControl(log:User, mapApi:any){
        mapApi.agControllerRegister('topmenuCtrl', function($scope){

            /************** interactive List ***************/
            
            this.selectedItemENT = '';

            this.itemsENT = [];
            //changement
            for (let i in log._envAcc){
                this.itemsENT.push({name : 'Environnement : ' +log._envAcc[i]._env , value: log._envAcc[i]._env});
            }
            this.setEnv = () => {

                log._environnementSel = this.selectedItemENT;
                log.setEnvironnementSelected(this.selectedItemENT);
                if(log._environnementSel === 'TST')
                    $scope.bgEnv = {
                        "background-color" : "lightblue", 
                    }
                else if(log._environnementSel === 'DEV'){
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

    /**
     *Compilateur de HTML avec les variables pour les boutons
     *
     * @param {*} template
     * @param {*} mapApi
     * @returns {JQuery<HTMLElement>}
     * @memberof manageController
     */
    compileTemplate(template,mapApi): JQuery<HTMLElement> {
        let temp = $(template);
        mapApi.$compile(temp);
        return temp;
    }  
}