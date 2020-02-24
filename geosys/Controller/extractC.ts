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
            $scope.ISVisibleASP = false;
            //permet d'afficher ou chacher le formulaire en cliquanr sur le titre
            this.ShowHide = function(){
                if(log._environnementSel!= ''){
                    $scope.IsVisible = $scope.IsVisible ? false : true; 
                    if($scope.IsVisible == true){
                        $scope.SelectedMenuE = {
                            "opacity" : "1", 
                        }
                    }else{
                        $scope.SelectedMenuE = {
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
            /************** Advanced Setting ***************/
            this.ShowHideAdvanced = function(){
                if(log._environnementSel!= ''){
                    $scope.IsVisibleASP = $scope.IsVisibleASP ? false : true; 
                    /*if($scope.IsVisibleASP == true){
                       
                    }else{
                        
                    }*/
                }  
            };
            /************** interactive List Advanced Setting ***************/
            this.selectedItemENT = '';
            this.itemsENT = [];
            //changement
            for (let i in log._envAcc){
                this.itemsENT.push({name : log._envAcc[i]._env , value: log._envAcc[i]._env});
            }
            /**************** From Submission ***************/
             this.submitForm = function() { 
                //get all the information of the form into the class
                let ext = new Extraire(
                     this.selectedItemA
                    ,this.selectedItemB);
                ext.setOptionnalEnvironnement(this.selectedItemENT);
                let apireturn:any = ext.submitForm(log);
                //if the conection to the API is a success
                if (apireturn != 'success'){
                    alert(apireturn.statusText)
                    $scope.SelectedMenuE = {
                        "background-color" : "red", 
                    }
                }else{
                    $scope.IsVisible = false;
                    $scope.SelectedMenuE = {
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
        /************ Bouton Extraire ***********/
        // TODO: creer la directive avant de compiler le code
        mapApi.agControllerRegister('SubmitExCtrl', function($scope){
            $scope.IsVisible = false;
            //permet d'afficher ou chacher le formulaire en cliquanr sur le titre
            this.ShowHide = function(){
                if(log._environnementSel!= ''){
                    $scope.IsVisible = $scope.IsVisible ? false : true;
                    if($scope.IsVisible == true){
                        $scope.SelectedMenuEU = {
                            "opacity" : "1", 
                        }
                    }else{
                        $scope.SelectedMenuEU = {
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
            /************** subscribe to the drawing event ***************/
            (<any>window).drawObs.drawPolygon.subscribe(value => {
                console.log(`Polygon added: ${JSON.stringify(value)}`);
                //log.createGeoJson('ESPG:3978',value.rings)
                let arcGIS = require('terraformer-arcgis-parser');
                let primitive = arcGIS.parse({
                    "rings":[[[243517.11899923813,1216032.5833121669],[1640519.9130048268,1279532.7103124205],[934081.0001270007,390530.9323088648],[243517.11899923813,1216032.5833121669]]],"spatialReference":{"wkid":3978}
                  });
                console.log(JSON.stringify(primitive));
                JSON.stringify(value)
                //this.geomSR = JSON.stringify(log.createGeoJson('ESPG:3978',value.rings));
                //alert(JSON.stringify(value));
                log._geom = JSON.stringify(value);
                //(<HTMLInputElement>document.getElementById('geomEx')).value= JSON.stringify(value);
            });

            /************** Copy to clipboard ***************/
            this.copyToClip = function() {
                var copyElement = document.createElement("span");
                copyElement.appendChild(document.createTextNode(log._geom));
                copyElement.id = 'tempCopyToClipboard';
                document.body.append(copyElement);
                // select the text
                var range = document.createRange();
                range.selectNode(copyElement);
                window.getSelection().removeAllRanges();
                window.getSelection().addRange(range);
                // copy & cleanup
                document.execCommand('copy');
                window.getSelection().removeAllRanges();
                copyElement.remove();
            }
            /************** Shapefile load ***************/
            this.loadshpEX = () => {
                let geom:any;
                //get the files in the input
                let files:any = (<HTMLInputElement>document.getElementById('fileshpEX')).files
                //if there is no file
                if(files.length == 0){
                    alert('hello');
                }else{
                    let file:any = files[0];
                    //A file reader
                    const reader = new FileReader();
                    //fonction for the file reader
                    reader.onload = (e) => {
                        if (reader.readyState != 2 || reader.error){
                            return;
                        } else {
                            //package to read a shapefile and get a geojson
                            let shp = require("shpjs");
                            
                            
                            shp(reader.result).then(function(dta){
                                //console.log(dta);
                                geom = JSON.stringify(dta);
                                log.createGeoJson('EPSG:4326',dta.features[0].geometry.coordinates[0]);
                                log._geom = JSON.stringify(dta);
                                (<HTMLInputElement>document.getElementById('geomEx')).value = geom;
                                this.geomSR = geom
                            });

                        }
                    }
                    reader.readAsArrayBuffer(file);     
                }
            }
            /************** Advanced Setting ***************/
            this.ShowHideAdvanced = function(){
                if(log._environnementSel!= ''){
                    $scope.IsVisibleASP = $scope.IsVisibleASP ? false : true; 
                }  
            };
            /************** interactive List Advanced Setting ***************/
            this.selectedItemENT = '';
            this.itemsENT = [];
            //changement
            for (let i in log._envAcc){
                this.itemsENT.push({name : log._envAcc[i]._env , value: log._envAcc[i]._env});
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
                extsr.setOptionnalEnvironnement(this.selectedItemENT);
                //If the connection to the API is a Success
                let apireturn:any = extsr.submitForm(log);
                if (apireturn != 'success'){
                    alert(apireturn.statusText)
                    $scope.SelectedMenuEU = {
                        "background-color" : "red", 
                    }
                }else{
                    $scope.IsVisible = false;
                    $scope.SelectedMenuEU = {
                        "background-color" : "green", 
                    }
                }   
            };
        });
    }

}