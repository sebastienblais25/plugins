"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/****** Import ******/
var extraire_1 = require("../operation/extraire");
var planifier_1 = require("../operation/planifier");
var livraison_1 = require("../operation/livraison");
var nettoyer_1 = require("../operation/nettoyer");
var manageController = /** @class */ (function () {
    function manageController() {
    }
    ;
    /**
     *the controller for all the function in planning templates
     * @param {User} log All the information of the user
     * @param {*} mapApi the api of of the viewer to set the controller
     * @param {*} config the config is for drawing
     * @memberof manageController
     */
    manageController.prototype.planControl = function (log, mapApi, config) {
        mapApi.agControllerRegister('submitFromP', function ($scope) {
            var _this = this;
            var that = this;
            $scope.IsVisible = false;
            //permet d'afficher ou chacher le formulaire en cliquant sur le titre
            this.ShowHide = function () {
                if (log._environnementSel != '') {
                    $scope.IsVisible = $scope.IsVisible ? false : true;
                    if ($scope.IsVisible == true) {
                        $scope.SelectedMenu = {
                            "opacity": "1",
                        };
                    }
                    else {
                        $scope.SelectedMenu = {};
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
            for (var i in log._themeAcc) {
                this.itemsC.push({ name: log._themeAcc[i]._nom, value: log._themeAcc[i]._id });
            }
            //List of working type
            this.itemsD = [];
            //the group of classes for a theme
            this.classes = [];
            //function ng-chage of the theme list
            this.setList = function () {
                console.log("set: " + _this.selectedItemC);
                //set the today's date
                var today = new Date();
                var dd = String(today.getDate());
                var mm = String(today.getMonth() + 1); //January is 0!
                var yyyy = String(today.getFullYear());
                if (dd.length < 2) {
                    dd = '0' + dd;
                }
                if (mm.length < 2) {
                    mm = '0' + mm;
                }
                //add the name of the theme
                var slectedthem;
                for (var i in _this.itemsC) {
                    if (_this.itemsC[i].value == _this.selectedItemC) {
                        slectedthem = _this.itemsC[i].name;
                    }
                }
                //Populate the input of the working unit
                _this.idut = slectedthem + '_' + dd + mm + yyyy + '_';
                //populate the working type list
                _this.itemsD.length = 0;
                _this.itemsD = log.setworkingtype(_this.selectedItemC);
                /** liste de classes **/
                var list = [];
                list = log.getlistofclasses(_this.selectedItemC);
                _this.classes.length = 0;
                //add the new list in list for the template
                _this.classes = list;
            };
            //for claases list select all the info
            this.toggleAll = function () {
                if (_this.listeclasse == true) {
                    for (var i in _this.classes) {
                        _this.classes[i].wanted = false;
                    }
                }
                else {
                    for (var i in _this.classes) {
                        _this.classes[i].wanted = true;
                    }
                }
            };
            //subscribe for the drawing
            window.drawObs.drawPolygon.subscribe(function (value) {
                _this.geomp = JSON.stringify(value);
            });
            this.toggleDraw = function () {
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
            };
            this.loadshp = function () {
                alert('hello');
            };
            /********** Form submission ************/
            //Envoie le fromulaire a l'API
            this.submitFormP = function () {
                //get all the information of the form into the class
                var listofclass = [];
                for (var i in this.classes) {
                    if (this.classes[i].wanted == true) {
                        listofclass.push(this.classes[i].name);
                    }
                }
                //set the information in the the json 
                var plan = new planifier_1.planifier(this.selectedItemC, document.getElementById("idUt").value, this.selectedItemD, listofclass, this.dfp, this.geomp, this.wherep);
                //submit the form to the API
                var ApiReturn = plan.submitForm(log);
                //If the return isn't a succes
                if (ApiReturn != 'success') {
                    $scope.SelectedMenu = {
                        "background-color": "red",
                    };
                }
                else {
                    $scope.IsVisible = false;
                    $scope.SelectedMenu = {
                        "background-color": "green",
                    };
                }
            };
        });
    };
    /**
     * the controller for all the function in the planned extract templates
     * @param {User} log All the information of the user
     * @param {*} mapApi the api of of the viewer to set the controller
     * @memberof manageController
     */
    manageController.prototype.extrairecontrols = function (log, mapApi) {
        /************ À placer en fonction ou class ***********/
        // TODO: creer la directive avant de compiler le code
        mapApi.agControllerRegister('SubmitCtrl', function ($scope) {
            var _this = this;
            $scope.IsVisible = false;
            //permet d'afficher ou chacher le formulaire en cliquanr sur le titre
            this.ShowHide = function () {
                if (log._environnementSel != '') {
                    $scope.IsVisible = $scope.IsVisible ? false : true;
                    if ($scope.IsVisible == true) {
                        $scope.SelectedMenu = {
                            "opacity": "1",
                        };
                    }
                    else {
                        $scope.SelectedMenu = {};
                    }
                }
            };
            /************** interactive List ***************/
            this.selectedItemA = '';
            this.selectedItemB = '';
            this.itemsA = [];
            for (var i in log._themeAcc) {
                this.itemsA.push({ name: log._themeAcc[i]._nom, value: log._themeAcc[i]._id });
            }
            this.itemsB = [];
            //création de la liste pour les unité de travail
            this.setList = function () {
                console.log("set: " + _this.selectedItemA);
                // populate list of working unit id
                _this.itemsB.length = 0;
                var list = log.setidUTtheme(_this.selectedItemA);
                for (var i in list) {
                    _this.itemsB.push(list[i]);
                }
            };
            /**************** From Submission ***************/
            this.submitForm = function () {
                //get all the information of the form into the class
                var ext = new extraire_1.Extraire(this.selectedItemA, this.selectedItemB);
                var ApiReturn = ext.submitForm(log);
                if (ApiReturn != 'success') {
                    alert(ApiReturn.statusText);
                    $scope.SelectedMenu = {
                        "background-color": "red",
                    };
                }
                else {
                    $scope.IsVisible = false;
                    $scope.SelectedMenu = {
                        "background-color": "green",
                    };
                }
            };
        });
    };
    /**
     *the controller fro all the function in the unplanned extract templates
     * @param {User} log All the information of the user
     * @param {*} mapApi the api of of the viewer to set the controller
     * @memberof manageController
     */
    manageController.prototype.extraireSRcontrols = function (log, mapApi) {
        /************ À placer en fonction ou class ***********/
        // TODO: creer la directive avant de compiler le code
        mapApi.agControllerRegister('SubmitExCtrl', function ($scope) {
            var _this = this;
            $scope.IsVisible = false;
            //permet d'afficher ou chacher le formulaire en cliquanr sur le titre
            this.ShowHide = function () {
                if (log._environnementSel != '') {
                    $scope.IsVisible = $scope.IsVisible ? false : true;
                    if ($scope.IsVisible == true) {
                        $scope.SelectedMenu = {
                            "opacity": "1",
                        };
                    }
                    else {
                        $scope.SelectedMenu = {};
                    }
                }
            };
            /************** interactive List ***************/
            this.selectedItemA = '';
            this.whereclause = '';
            this.geom = '';
            this.itemsA = [];
            for (var i in log._themeAcc) {
                this.itemsA.push({ name: log._themeAcc[i]._nom, value: log._themeAcc[i]._id });
            }
            this.classes = [];
            //création de la liste pour les unité de travail
            this.setList = function () {
                var list = [];
                list = log.getlistofclasses(_this.selectedItemC);
                _this.classes.length = 0;
                //add the new list in list for the template
                _this.classes = list;
            };
            //select all the classes in the list
            this.toggleAll = function () {
                if (_this.listeclasse == true) {
                    for (var i in _this.classes) {
                        _this.classes[i].wanted = false;
                    }
                }
                else {
                    for (var i in _this.classes) {
                        _this.classes[i].wanted = true;
                    }
                }
            };
            //subscribe for the drawing
            window.drawObs.drawPolygon.subscribe(function (value) {
                //console.log(`Polygon added: ${JSON.stringify(value)}`);
                _this.geom = JSON.stringify(value);
            });
            /**************** From Submission ***************/
            //Envoie le formulaire a l'Api
            this.submitSRForm = function () {
                //get all the information of the form into the class
                var listofclass = [];
                for (var i in this.classes) {
                    if (this.classes[i].wanted == true) {
                        listofclass.push(this.classes[i].name);
                    }
                }
                var siClip;
                if (this.cbClip == true) {
                    siClip = 'oui';
                }
                else {
                    siClip = 'non';
                }
                var extsr = new extraire_1.Extraire(this.selectedItemA);
                extsr.setInfoForSR(listofclass, siClip, this.whereclause, this.geom);
                var ApiReturn = extsr.submitForm(log);
                if (ApiReturn != 'success') {
                    alert(ApiReturn.statusText);
                    $scope.SelectedMenu = {
                        "background-color": "red",
                    };
                }
                else {
                    $scope.IsVisible = false;
                    $scope.SelectedMenu = {
                        "background-color": "green",
                    };
                }
            };
        });
    };
    /**
     *the controller for all the function in the delivery templates
     * @param {User} log All the information of the user
     * @param {*} mapApi the api of of the viewer to set the controller
     * @memberof manageController
     */
    manageController.prototype.deliControl = function (log, mapApi) {
        //mapApi.agDirectiveRegister()
        mapApi.agControllerRegister('submitFromD', function ($scope) {
            var _this = this;
            $scope.IsVisible = false;
            //permet d'afficher ou chacher le formulaire en cliquanr sur le titre
            this.ShowHide = function () {
                if (log._environnementSel != '') {
                    $scope.IsVisible = $scope.IsVisible ? false : true;
                    if ($scope.IsVisible == true) {
                        $scope.SelectedMenu = {
                            "opacity": "1",
                        };
                    }
                    else {
                        $scope.SelectedMenu = {};
                    }
                }
            };
            /************** interactive List ***************/
            this.typeOper = '';
            this.selectedItemE = '';
            this.selectedItemF = '';
            this.itemsE = [];
            for (var i in log._themeAcc) {
                this.itemsE.push({ name: log._themeAcc[i]._nom, value: log._themeAcc[i]._id });
            }
            this.itemsF = [];
            this.setList = function () {
                console.log("set: " + _this.selectedItemE);
                console.log("set: " + _this.typeOper);
                // populate list b with new items
                _this.itemsF.length = 0;
                var list = log.setidUTtheme(_this.selectedItemE);
                for (var i in list) {
                    _this.itemsF.push(list[i]);
                }
            };
            this.filechanged = function () {
                _this.fileSelect.trigger('click');
            };
            //Envoie le fromulaire a l'API
            this.submitFormD = function (element) {
                //get all the information of the form into the class
                var formdata = new FormData();
                formdata.append('fichier_data', document.getElementById('fileMD').files[0]);
                formdata.append('fichier_meta', document.getElementById('filefgdb').files[0]);
                var livre = new livraison_1.Livraison(this.selectedItemF, this.selectedItemE, this.typeOper);
                var ApiReturn = livre.submitForm(formdata, log);
                if (ApiReturn != undefined) {
                    alert(ApiReturn + ' 4');
                    console.log(ApiReturn);
                    $scope.SelectedMenu = {
                        "background-color": "red",
                    };
                }
                else {
                    console.log(log.getToken());
                    $scope.SelectedMenu = {
                        "background-color": "green",
                    };
                }
            };
        });
    };
    /**
     * the controller for all the function for CreateMD
     * @param {User} log getting all the information of the user and getting the envrionnemnt h'es already in
     * @param {*} mapApi need the mapApi for setting the controller.
     * @memberof manageController
     */
    manageController.prototype.creerControl = function (log, mapApi) {
        mapApi.agControllerRegister('submitFromC', function ($scope) {
            var _this = this;
            $scope.IsVisible = false;
            //permet d'afficher ou chacher le formulaire en cliquanr sur le titre
            this.ShowHide = function () {
                if (log._environnementSel != '') {
                    $scope.IsVisible = $scope.IsVisible ? false : true;
                    if ($scope.IsVisible == true) {
                        $scope.SelectedMenu = {
                            "opacity": "1",
                        };
                    }
                    else {
                        $scope.SelectedMenu = {};
                    }
                }
            };
            /************** interactive List ***************/
            this.typeOper = '';
            this.selectedItemE = '';
            this.selectedItemF = '';
            this.itemsE = [];
            for (var i in log._themeAcc) {
                this.itemsE.push({ name: log._themeAcc[i]._nom, value: log._themeAcc[i]._id });
            }
            //List working unit ID
            this.itemsF = [];
            //list sources ID
            this.sources = [];
            //list of precisions ID
            this.precisions = [];
            //list of contraints ID
            this.contraintes = [];
            //création de la liste pour les unité de travail
            this.setList = function () {
                /******changer pour sources********/
                var listS = [];
                listS = log.getlistofclasses(_this.selectedItemE);
                _this.sources.length = 0;
                //add the new list in list for the template
                _this.sources = listS;
                /******changer pour precision********/
                var listP = [];
                listP = log.getlistofclasses(_this.selectedItemE);
                _this.precisions.length = 0;
                //create the list with name and varaible for the checkbox
                _this.precisions = listP;
                /******changer pour contraintes********/
                var listCo = [];
                listCo = log.getlistofclasses(_this.selectedItemE);
                _this.contraintes.length = 0;
                //create the list with name and varaible for the checkbox
                _this.contraintes = listCo;
                // populate list b with new items
                _this.itemsF.length = 0;
                var list = log.setidUTtheme(_this.selectedItemE);
                for (var i in list) {
                    _this.itemsF.push(list[i]);
                }
            };
            //for claases list select all the info
            this.toggleAllS = function () {
                if (_this.listeSources == true) {
                    for (var i in _this.sources) {
                        _this.sources[i].wanted = false;
                    }
                }
                else {
                    for (var i in _this.sources) {
                        _this.sources[i].wanted = true;
                    }
                }
            };
            //for claases list select all the info
            this.toggleAllP = function () {
                if (_this.listePrecision == true) {
                    for (var i in _this.precisions) {
                        _this.precisions[i].wanted = false;
                    }
                }
                else {
                    for (var i in _this.precisions) {
                        _this.precisions[i].wanted = true;
                    }
                }
            };
            //for claases list select all the info
            this.toggleAllC = function () {
                if (_this.listeContrainte == true) {
                    for (var i in _this.contraintes) {
                        _this.contraintes[i].wanted = false;
                    }
                }
                else {
                    for (var i in _this.contraintes) {
                        _this.contraintes[i].wanted = true;
                    }
                }
            };
        });
    };
    /**
     * Change the environnement of the user and change the color of the backgournd if not PRO
     * @param {User} log getting all the information of the user and getting the envrionnemnt h'es already in
     * @param {*} mapApi need the mapApi for setting the controller.
     * @memberof manageController
     */
    manageController.prototype.topmenuControl = function (log, mapApi) {
        mapApi.agControllerRegister('topmenuCtrl', function ($scope) {
            /**************** From Submission ***************/
            var _this = this;
            /************** interactive List ***************/
            this.selectedItemENT = '';
            this.itemsENT = [];
            //changement
            for (var i in log._envAcc) {
                this.itemsENT.push({ name: 'Environnement : ' + log._envAcc[i]._env, value: log._envAcc[i]._env });
            }
            this.setEnv = function () {
                log._environnementSel = _this.selectedItemENT;
                log.setEnvironnementSelected(_this.selectedItemENT);
                if (log._environnementSel === 'TST')
                    $scope.bgEnv = {
                        "background-color": "lightblue",
                    };
                else if (log._environnementSel === 'DEV') {
                    $scope.bgEnv = {
                        "background-color": "pink",
                    };
                }
                else {
                    $scope.bgEnv = {
                        "background-color": "white",
                    };
                }
            };
            /*********** Info User Panel *************/
            this.openInfoUser = function () {
                var panel;
                panel = mapApi.panels.create('infoUser');
                panel.element.css({ top: '0px;', left: '410px;', bottom: '50%;', margin: '100px 300px 300px 500px' });
                panel.header.title = 'Info User';
                var closeBtn = panel.header.closeButton;
                panel.open();
            };
        });
    };
    /**
     * the controller for the cleaning function
     * @param {User} log getting all the information of the user and getting the envrionnemnt h'es already in
     * @param {*} mapApi need the mapApi for setting the controller.
     * @memberof manageController
     */
    manageController.prototype.nettoyagecontrols = function (log, mapApi) {
        /************ À placer en fonction ou class ***********/
        // TODO: creer la directive avant de compiler le code
        mapApi.agControllerRegister('SubmitNetCtrl', function ($scope) {
            var _this = this;
            $scope.IsVisible = false;
            //permet d'afficher ou chacher le formulaire en cliquant sur le titre
            this.ShowHide = function () {
                if (log._environnementSel != '') {
                    $scope.IsVisible = $scope.IsVisible ? false : true;
                    if ($scope.IsVisible == true) {
                        $scope.SelectedMenu = {
                            "opacity": "1",
                        };
                    }
                    else {
                        $scope.SelectedMenu = {};
                    }
                }
            };
            /************** interactive List ***************/
            this.selectedItemA = '';
            this.selectedItemB = '';
            this.itemsA = [];
            for (var i in log._themeAcc) {
                this.itemsA.push({ name: log._themeAcc[i]._nom, value: log._themeAcc[i]._id });
            }
            this.itemsB = [];
            //création de la liste pour les unité de travail
            this.setList = function () {
                console.log("set: " + _this.selectedItemA);
                // populate list of working unit id
                _this.itemsB.length = 0;
                var list = log.setidUTtheme(_this.selectedItemA);
                for (var i in list) {
                    _this.itemsB.push(list[i]);
                }
            };
            /**************** From Submission ***************/
            this.submitNett = function () {
                var deleted = confirm('Confirmez le nettoyage ? / Confirm the cleaning ? ');
                if (deleted) {
                    var nettoyage = new nettoyer_1.Cleaning(this.selectedItemA, this.selectedItemB);
                    var renet = nettoyage.submitForm(log);
                    if (renet != 'success') {
                        alert(renet.statusText);
                        $scope.SelectedMenu = {
                            "background-color": "red",
                        };
                    }
                    else {
                        $scope.IsVisible = false;
                        //console.log(log._token);
                        alert("Deleted");
                        $scope.SelectedMenu = {
                            "background-color": "green",
                        };
                    }
                }
            };
        });
    };
    /**
     * The controoller for to cancel function
     * @param {User} log getting all the information of the user and getting the envrionnemnt h'es already in
     * @param {*} mapApi need the mapApi for setting the controller.
     * @memberof manageController
     */
    manageController.prototype.cancelcontrols = function (log, mapApi) {
        /************ À placer en fonction ou class ***********/
        // TODO: creer la directive avant de compiler le code
        mapApi.agControllerRegister('cancelStep', function ($scope) {
            var _this = this;
            $scope.IsVisible = false;
            //permet d'afficher ou chacher le formulaire en cliquant sur le titre
            this.ShowHide = function () {
                if (log._environnementSel != '') {
                    $scope.IsVisible = $scope.IsVisible ? false : true;
                    if ($scope.IsVisible == true) {
                        $scope.SelectedMenu = {
                            "opacity": "1",
                        };
                    }
                    else {
                        $scope.SelectedMenu = {};
                    }
                }
            };
            /************** interactive List ***************/
            this.selectedItemA = '';
            this.selectedItemB = '';
            this.stepCan = '';
            this.itemsA = [];
            for (var i in log._themeAcc) {
                this.itemsA.push({ name: log._themeAcc[i]._nom, value: log._themeAcc[i]._id });
            }
            this.itemsB = [];
            //création de la liste pour les unité de travail
            this.setList = function () {
                console.log("set: " + _this.selectedItemA);
                // populate list of working unit id
                _this.itemsB.length = 0;
                var list = log.setidUTtheme(_this.selectedItemA);
                for (var i in list) {
                    _this.itemsB.push(list[i]);
                }
            };
            /**************** From Submission ***************/
            this.submitCan = function () {
                //get all the information of the form into the class
                /*let ext = new Extraire(
                     this.selectedItemA
                    ,this.selectedItemB);
                let ApiReturn:any = ext.submitForm(log);
                if (ApiReturn != 'success'){
                    alert(ApiReturn.statusText)
                    $scope.SelectedMenu = {
                        "background-color" : "red",
                    }
                }else{
                    $scope.IsVisible = false;
                    console.log(log._token);
                    $scope.SelectedMenu = {
                        "background-color" : "green",
                    }
                }*/
                //alert(this._ApiReturn.value);    
            };
        });
    };
    /**
     * Compilateur de HTML avec les variables pour les boutons
     * @param {*} template the template for the form
     * @param {*} mapApi the main API with the function to compile
     * @returns {JQuery<HTMLElement>} return the output compiled
     * @memberof manageController
     */
    manageController.prototype.compileTemplate = function (template, mapApi) {
        var temp = $(template);
        mapApi.$compile(temp);
        return temp;
    };
    return manageController;
}());
exports.manageController = manageController;
