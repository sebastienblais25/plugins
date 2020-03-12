import { User } from "../user";
import { Cleaning } from "../operation/nettoyer";


export class CleaningController{

    constructor(){};

    /**
     * the controller for the cleaning function
     * @param {User} log getting all the information of the user and getting the envrionnemnt h'es already in
     * @param {*} mapApi need the mapApi for setting the controller.
     * @memberof manageController
     */
    nettoyagecontrols(log:User, mapApi:any):void{
        /************ À placer en fonction ou class ***********/
        // TODO: creer la directive avant de compiler le code
        mapApi.agControllerRegister('SubmitNetCtrl', function($scope){
            
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
                this.selectedItemB = '';
                // populate list of working unit id
                this.itemsB.length = 0;
                let list:any = log.setidUTtheme(this.selectedItemA)
                for (let i in list){
                    this.itemsB.push(list[i])
                }
            }
            /**************** From Submission ***************/
            this.submitNett = function() { 
                
                let deleted = confirm('Confirmez le nettoyage ? / Confirm the cleaning ? ');
                if(deleted){
                    let nettoyage:Cleaning = new Cleaning(this.selectedItemA ,this.selectedItemB)
                    let renet= nettoyage.submitForm(log);
                    if (renet != 'success'){

                        alert(renet.statusText)
                        $scope.SelectedMenuC = {
                        "background-color" : "red", 
                        }
                    }else{
                        //$scope.IsVisibleCL = false;
                        //console.log(log._token);
                        alert("Deleted")
                        $scope.SelectedMenuC = {
                            "background-color" : "green", 
                        }
                    }
                }   
            };
        });
    }
}