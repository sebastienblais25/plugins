import { User } from "../user";
import { Livraison } from "../operation/livraison";


export class DeliveryController{

    constructor(){};

      /**
     *the controller for all the function in the delivery templates
     * @param {User} log All the information of the user
     * @param {*} mapApi the api of of the viewer to set the controller
     * @memberof manageController
     */
    deliControl(log:User, mapApi:any):void{
        //mapApi.agDirectiveRegister()
        mapApi.agControllerRegister('submitFromD', function($scope){
            
            /************** interactive List ***************/
            this.typeOper = '';
            this.selectedItemE = '';
            this.selectedItemF = '';
            this.itemsE = [];
            for (let i in log._themeAcc){
                this.itemsE.push({name : log._themeAcc[i]._nom , value: log._themeAcc[i]._id});
            }
            this.itemsF = [];
            this.setList = () => {
                // populate list b with new items
                this.itemsF.length = 0;
                let list:any = log.setidUTtheme(this.selectedItemE)
                for (let i in list){
                    this.itemsF.push(list[i])
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

            //Envoie le fromulaire a l'API
            this.submitFormD = function(element) { 
                //get all the information of the form into the class
                if(this.selectedItemF == ''){
                    alert("Sélectionne un identifiant d'unité de travail")
                }else if((<HTMLInputElement>document.getElementById('fileMD')).files.length == 0){
                    alert("Ajoute un fichier de métadonnée")
                }else if((<HTMLInputElement>document.getElementById('filefgdb')).files.length == 0){
                    alert("Ajout un fichier de geodatabase")
                }else{
                    let formdata = new FormData();
                    formdata.append('fichier_data',(<HTMLInputElement>document.getElementById('fileMD')).files[0]);
                    formdata.append('fichier_meta',(<HTMLInputElement>document.getElementById('filefgdb')).files[0]);
                    let livre:Livraison = new Livraison(this.selectedItemF,this.selectedItemE,this.typeOper);
                    livre.setOptionnalEnvironnement(this.selectedItemENT);
                    let apireturn:any = livre.submitForm(formdata,log);     
                    if (apireturn != undefined){
                        alert(apireturn);
                        //console.log(apireturn);
                        $scope.SelectedMenuD = {
                            "background-color" : "red", 
                        }
                    }else{
                        console.log(log.gettoken());
                        //$scope.IsVisibleD = false;
                        $scope.SelectedMenuD = {
                            "background-color" : "green", 
                        }
                    }
                }
            };
        })
    }
}