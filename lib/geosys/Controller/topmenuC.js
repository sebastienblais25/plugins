"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var infoUser_1 = require("../templates/infoUser");
var TopMenuController = /** @class */ (function () {
    function TopMenuController() {
    }
    ;
    /**
     * Change the environnement of the user and change the color of the backgournd if not PRO
     * @param {User} log getting all the information of the user and getting the envrionnemnt h'es already in
     * @param {*} mapApi need the mapApi for setting the controller.
     * @memberof manageController
     */
    TopMenuController.prototype.topmenuControl = function (log, mapApi) {
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
                if (!_this.panel) {
                    // make sure both header and body have a digest cycle run on them
                    _this.panel = mapApi.panels.create('infoUser');
                    _this.panel.element.css({
                        bottom: '0em',
                        width: '400px'
                    });
                    _this.panel.element.css({ top: '0px;', left: '410px;', bottom: '50%;', margin: '100px 300px 300px 500px' });
                    var closeBtn = _this.panel.header.closeButton;
                    _this.panel.header.title = "Info user";
                }
                else {
                    _this.panel.close();
                }
                var output = infoUser_1.infoUser.replace('(username)', log.getusername());
                output = output.replace('(theme)', log.getAllThemeNAme());
                _this.panel.body = output;
                _this.panel.open();
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
    TopMenuController.prototype.compileTemplate = function (template, mapApi) {
        var temp = $(template);
        mapApi.$compile(temp);
        return temp;
    };
    return TopMenuController;
}());
exports.TopMenuController = TopMenuController;
