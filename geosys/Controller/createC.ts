import { User } from "../user";
import { Creer } from "../operation/creer";


export class CreateController{

    constructor(){};

     /**
     * the controller for all the function for CreateMD
     * @param {User} log getting all the information of the user and getting the envrionnemnt h'es already in
     * @param {*} mapApi need the mapApi for setting the controller.
     * @memberof manageController
     */
    creerControl(log:User, mapApi:any):void{
        mapApi.agControllerRegister('submitFromC', function($scope){
            $scope.IsVisible = false;
            //permet d'afficher ou chacher le formulaire en cliquanr sur le titre
            this.ShowHide = function(){
                if(log._environnementSel!= ''){
                    $scope.IsVisible = $scope.IsVisible ? false : true;
                    if($scope.IsVisible == true){
                        $scope.SelectedMenuCr = {
                            "opacity" : "1", 
                        }
                    }else{
                        $scope.SelectedMenuCr = {
                        }
                    } 
                }    
            };
            /************** interactive List ***************/
            this.typeOper = '';
            this.selectedItemE = '';
            this.selectedItemF = '';
            this.itemsE = [];
            for (let i in log._themeAcc){
                this.itemsE.push({name : log._themeAcc[i]._nom , value: log._themeAcc[i]._id});
            }
            //List working unit ID
            this.itemsF = [];
            //list sources ID
            this.sources = [];
            //list of precisions ID
            this.precisions = [];
            //list of contraints ID
            this.contraintes = []
            //création de la liste pour les unité de travail
            this.setList = () => {
                /******changer pour sources********/
                let listS= [];
                listS = log.getlistofclasses(this.selectedItemE);
                this.sources.length = 0;
                //add the new list in list for the template
                this.sources = listS
                /******changer pour precision********/
                let listP= [];
                listP = log.getlistofclasses(this.selectedItemE);
                this.precisions.length = 0;
                //create the list with name and varaible for the checkbox
                this.precisions= listP
                /******changer pour contraintes********/
                let listCo= [];
                listCo = log.getlistofclasses(this.selectedItemE);
                this.contraintes.length = 0;
                //create the list with name and varaible for the checkbox
                this.contraintes = listCo
                // populate list b with new items
                this.itemsF.length = 0;
                let list:any = log.setidUTtheme(this.selectedItemE)
                for (let i in list){
                    this.itemsF.push(list[i])
                }
            }
            //for claases list select all the info
            this.toggleAllS = () => {
                if( this.listeSources == true){
                    for(let i in this.sources){
                        this.sources[i].wanted = false;
                    }  
                }else{
                    for(let i in this.sources){
                        this.sources[i].wanted = true;
                    }
                }
            }
            //for claases list select all the info
            this.toggleAllP = () => {
                if( this.listePrecision == true){
                    for(let i in this.precisions){
                        this.precisions[i].wanted = false;
                    }  
                }else{
                    for(let i in this.precisions){
                        this.precisions[i].wanted = true;
                    }
                }
            }
            //for claases list select all the info
            this.toggleAllC = () => {
                if( this.listeContrainte == true){
                    for(let i in this.contraintes){
                        this.contraintes[i].wanted = false;
                    }  
                }else{
                    for(let i in this.contraintes){
                        this.contraintes[i].wanted = true;
                    }
                }
            }
        })
    }
}