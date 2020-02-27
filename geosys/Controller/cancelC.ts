import { User } from "../user";
//import { Cancel } from "../operation/cancel";


export class CancelController{

    constructor(){};

     /**
     * The controoller for to cancel function
     * @param {User} log getting all the information of the user and getting the envrionnemnt h'es already in
     * @param {*} mapApi need the mapApi for setting the controller.
     * @memberof manageController
     */
    cancelcontrols(log:User, mapApi:any):void{
        /************ À placer en fonction ou class ***********/
        // TODO: creer la directive avant de compiler le code
        mapApi.agControllerRegister('cancelStep', function($scope){ 
            
            /************** interactive List ***************/
            this.selectedItemA = '';
            this.selectedItemB = '';
            this.stepCan = '';
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
             this.submitCan = function() { 
                //get all the information of the form into the class
                /*let ext = new Extraire(
                     this.selectedItemA
                    ,this.selectedItemB);     
                let apireturn:any = ext.submitForm(log);
                if (apireturn != 'success'){
                    alert(apireturn.statusText)
                    $scope.SelectedMenu = {
                        "background-color" : "red", 
                    }
                }else{
                    $scope.IsVisibleCA = false;
                    console.log(log._token);
                    $scope.SelectedMenu = {
                        "background-color" : "green", 
                    }
                }*/
                //alert(this._apireturn.value);    
            };
        });
    }
}