"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CreateController = /** @class */ (function () {
    function CreateController() {
    }
    ;
    /**
    * the controller for all the function for CreateMD
    * @param {User} log getting all the information of the user and getting the envrionnemnt h'es already in
    * @param {*} mapApi need the mapApi for setting the controller.
    * @memberof manageController
    */
    CreateController.prototype.creerControl = function (log, mapApi) {
        mapApi.agControllerRegister('submitFromC', function ($scope) {
            var _this = this;
            /************** interactive List ***************/
            //operation type on the DB
            this.typeOper = '';
            //theme
            this.selectedItemE = '';
            //Working unit ID
            this.selectedItemF = '';
            //set up theme list
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
            //for classes list select all the info
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
    return CreateController;
}());
exports.CreateController = CreateController;
