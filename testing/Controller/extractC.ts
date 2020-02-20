import { User } from "../user";
import { Extraire } from "../operation/extraire";


export class ExtractController{

    constructor(){};
    /**
     * the controller for all the function in the planned extract templates
     * @param {User} log All the information of the user
     * @param {*} mapApi the api of of the viewer to set the controller
     * @memberof manageController
     */
    extrairecontrols(log:User, mapApi:any):void{
        /************ À placer en fonction ou class ***********/
        // TODO: creer la directive avant de compiler le code
        mapApi.agControllerRegister('SubmitCtrl', function($scope){ 
            $scope.IsVisible = false;
            //permet d'afficher ou chacher le formulaire en cliquanr sur le titre
            this.ShowHide = function(){
                if(log._environnementSel!= ''){
                    $scope.IsVisible = $scope.IsVisible ? false : true; 
                    if($scope.IsVisible == true){
                        $scope.SelectedMenu = {
                            "opacity" : "1", 
                        }
                    }else{
                        $scope.SelectedMenu = {
                        }
                    }
                }  
            };
            /************** interactive List ***************/
            this.selectedItemA = '';
            this.selectedItemB = '';
            this.itemsA = [];
            for (let i in log._themeAcc){
                this.itemsA.push({name : log._themeAcc[i]._nom , value: log._themeAcc[i]._id});
            }
            this.itemsB = [];
            //création de la liste pour les unité de travail
            this.setList = () => {
                console.log(`set: ${this.selectedItemA}`);
                // populate list of working unit id
                this.itemsB.length = 0;
                let list:any = log.setidUTtheme(this.selectedItemA)
                for (let i in list){
                    this.itemsB.push(list[i])
                }
            }
            /**************** From Submission ***************/
             this.submitForm = function() { 
                //get all the information of the form into the class
                let ext = new Extraire(
                     this.selectedItemA
                    ,this.selectedItemB);
                let apireturn:any = ext.submitForm(log);
                if (apireturn != 'success'){
                    alert(apireturn.statusText)
                    $scope.SelectedMenu = {
                        "background-color" : "red", 
                    }
                }else{
                    $scope.IsVisible = false;
                    $scope.SelectedMenu = {
                        "background-color" : "green", 
                    }
                } 
            };
        });
    }

    /**
     *the controller fro all the function in the unplanned extract templates
     * @param {User} log All the information of the user
     * @param {*} mapApi the api of of the viewer to set the controller
     * @memberof manageController
     */
    extraireSRcontrols(log:User, mapApi:any):void{
        /************ À placer en fonction ou class ***********/
        // TODO: creer la directive avant de compiler le code
        mapApi.agControllerRegister('SubmitExCtrl', function($scope){
            $scope.IsVisible = false;
            //permet d'afficher ou chacher le formulaire en cliquanr sur le titre
            this.ShowHide = function(){
                if(log._environnementSel!= ''){
                    $scope.IsVisible = $scope.IsVisible ? false : true;
                    if($scope.IsVisible == true){
                        $scope.SelectedMenu = {
                            "opacity" : "1", 
                        }
                    }else{
                        $scope.SelectedMenu = {
                        }
                    }
                }  
            };
            /************** interactive List ***************/
            this.selectedItemA = '';
            this.whereclause = '';
            //this.geomSR = '';
            this.itemsA = [];
            for (let i in log._themeAcc){
                this.itemsA.push({name : log._themeAcc[i]._nom , value: log._themeAcc[i]._id});
            }
            this.classes = [];
            //création de la liste pour les unité de travail
            this.setList = () => {
                let list= [];
                list = log.getlistofclasses(this.selectedItemC);
                this.classes.length = 0;
                //add the new list in list for the template
                this.classes = list 
            }
            //select all the classes in the list
            this.toggleAll = () => {
                if( this.listeclasse == true){
                    for(let i in this.classes){
                        this.classes[i].wanted = false;
                    }  
                }else{
                    for(let i in this.classes){
                        this.classes[i].wanted = true;
                    }
                }
            }
            //subscribe for the drawing
            (<any>window).drawObs.drawPolygon.subscribe(value => {
                //console.log(`Polygon added: ${JSON.stringify(value)}`);
                //this.geomSR = JSON.stringify(value);
                (<HTMLInputElement>document.getElementById('geomEx')).value= JSON.stringify(value);
            });

            //load a shp
            this.loadshpEX = () => {
                let geom:any;
                let files:any = (<HTMLInputElement>document.getElementById('fileshpEX')).files
                if(files.length == 0){
                    alert('hello');
                }else{
                    
                    let file:any = files[0];
                    
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        if (reader.readyState != 2 || reader.error){
                            return;
                        } else {
                            let shp = require("shpjs");
                            shp(reader.result).then(function(dta){
                                console.log(dta);
                                geom = JSON.stringify(dta);
                                log._geom = JSON.stringify(dta);
                                (<HTMLInputElement>document.getElementById('geomEx')).value = geom;
                                //this.geomSR = geom
                            });

                        }
                    }
                    reader.readAsArrayBuffer(file);
                    
                      
                }
            }
            
            /**************** From Submission ***************/
            //Envoie le formulaire a l'Api
            this.submitSRForm = function() { 
                //get all the information of the form into the class
                this.geomSR = log._geom;
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
                //console.log(this.geomSR)
                let extsr = new Extraire(
                     this.selectedItemA);
                    extsr.setInfoForSR(listofclass,
                    siClip,
                    this.whereclause,
                    this.geomSR)
                let apireturn:any = extsr.submitForm(log);
                if (apireturn != 'success'){
                    alert(apireturn.statusText)
                    $scope.SelectedMenu = {
                        "background-color" : "red", 
                    }
                }else{
                    $scope.IsVisible = false;
                    $scope.SelectedMenu = {
                        "background-color" : "green", 
                    }
                }   
            };
        });
    }

}