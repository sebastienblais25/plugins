import { planifier } from "../operation/planifier";
import { User } from "../user";
import { urlWorkingType } from '../config/url';
import { CLEAR_FILTERS_TEMPLATE } from '../../enhancedTable/templates';
//const FileReader = require('filereader')


export class PlanningController{

    constructor(){};

    /**
     *the controller for all the function in planning templates
     * @param {User} log All the information of the user
     * @param {*} mapApi the api of of the viewer to set the controller
     * @param {*} config the config is for drawing 
     * @memberof manageController
     */
    planControl(log:User, mapApi:any, config:any):void{
        mapApi.agControllerRegister('submitFromP', function($scope){
            const that = this;
            $scope.IsVisible = false;
            //permet d'afficher ou chacher le formulaire en cliquant sur le titre
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
            this.selectedItemC = '';
            this.selectedItemD = '';
            this.dfp = '';
            this.geomp = 'hello';
            this.wherep = 'hello';
            this.itemsC = [];
            //theme list
            for (let i in log._themeAcc){
                this.itemsC.push({name : log._themeAcc[i]._nom , value: log._themeAcc[i]._id});
            }
            //List of working type
            this.itemsD = [];
            //the group of classes for a theme
            this.classes = [];
            //function ng-chage of the theme list
            this.setList = () => {
                console.log(`set: ${this.selectedItemC}`);
                //set the today's date
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
                //add the name of the theme
                let slectedthem:string;
                for(let i in this.itemsC){
                    if(this.itemsC[i].value == this.selectedItemC){
                        slectedthem = this.itemsC[i].name;
                    }
                }
                //Populate the input of the working unit
                this.idut = slectedthem + '_'+ dd + mm + yyyy + '_';
                //populate the working type list
                this.itemsD.length = 0;
                this.itemsD = log.setworkingtype(this.selectedItemC);
                /** liste de classes **/
                let list= [];
                list = log.getlistofclasses(this.selectedItemC);
                this.classes.length = 0;
                //add the new list in list for the template
                this.classes=list
            }
            //for claases list select all the info
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
                this.geomp = JSON.stringify(value);
            });
            this.toggleDraw = function() {
                var copyElement = document.createElement("span");
                copyElement.appendChild(document.createTextNode(this.geomp));
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
            
            //load a shp
            this.loadshp = () => {
                
                let files:any = (<HTMLInputElement>document.getElementById('fileshp')).files
                if(files.length == 0){
                    alert('hello');
                }else{
                    
                    let file:any = files[0];
                    
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        if (reader.readyState != 2 || reader.error){
                            alert('hello');
                            return;
                        } else {
                            alert('working');
                            //console.log(reader.result);
                            
                            /*shp.(reader.result).then(function(geojson){

                            })*/
                            console.log(reader.result)
                            /*let shapefile = require("shapefile");
                            shapefile.read(reader.result)
                                .then(data => {
                                    
                                    console.log(data);
                                    this.geomp = JSON.stringify(data);
                            });*/
                        }
                    }
                    reader.readAsArrayBuffer(file);
                      
                }
            }
            /********** Form submission ************/
            //Envoie le fromulaire a l'API
            this.submitFormP = function() { 
                //get all the information of the form into the class
                let listofclass = []
                for(let i in this.classes){
                    if(this.classes[i].wanted ==true){
                        listofclass.push(this.classes[i].name);
                    }
                }
                //set the information in the the json 
                let plan:planifier = new planifier(
                    this.selectedItemC,
                    (<HTMLInputElement>document.getElementById("idUt")).value,
                    this.selectedItemD,
                    listofclass,
                    this.dfp,
                    this.geomp,
                    this.wherep);
                //submit the form to the API
                let apireturn:any = plan.submitForm(log);
                //If the return isn't a succes
                if (apireturn != 'success'){
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