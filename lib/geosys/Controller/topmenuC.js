"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var infoUser_1 = require("../templates/infoUser");
var helpDoc_1 = require("../Documentation/helpDoc");
var TopMenuController = /** @class */ (function () {
    function TopMenuController() {
    }
    ;
    /**
     * Change the environnement of the user and change the color of the backgournd if not PRO
     * @param {User} log getting all the information of the user and getting the envrionnemnt he's already in
     * @param {*} mapApi need the mapApi for setting the controller.
     * @memberof manageController
     */
    TopMenuController.prototype.topmenuControl = function (log, mapApi) {
        mapApi.agControllerRegister('topmenuCtrl', function () {
            var _this = this;
            /************** interactive List ***************/
            this.selectedItemENT = '';
            this.itemsENT = [];
            //changement
            for (var i in log.getEnvAcc()) {
                this.itemsENT.push({ name: 'Environnement : ' + log.getEnvAcc()[i]._env, value: log.getEnvAcc()[i]._env });
            }
            this.setEnv = function () {
                log.setEnvironnementSelected(_this.selectedItemENT);
                console.log(log.getEnvironnementSel());
                if (log.getEnvironnementSel() == 'TST') {
                    _this.bgEnv = {
                        "background-color": "lightgreen",
                    };
                }
                else if (log.getEnvironnementSel() == 'DEV') {
                    _this.bgEnv = {
                        "background-color": "pink",
                    };
                }
                else {
                    _this.bgEnv = {
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
                var listRight = '';
                for (var i in log.getRight()) {
                    listRight += log.getRight()[i].getnom() + '<br/>';
                }
                var output = infoUser_1.infoUser.replace('(username)', log.getUsername() + ' ' + log.getPassword());
                output = output.replace('(theme)', log.getAllThemeNAme());
                output = output.replace('(right)', listRight);
                output = output.replace('(equipe)', log.getEquipe().getnom());
                output = output.replace('(envir)', log.getEnvironnementSel() + '  </br>URL : ' + log.getUrlEnvselected());
                var paneluser = new TopMenuController();
                paneluser.controlUserInfo(log, mapApi);
                _this.panel.body = output;
                _this.panel.open();
            };
            this.openHelpUser = function () {
                if (!_this.panel1) {
                    // make sure both header and body have a digest cycle run on them
                    _this.panel1 = mapApi.panels.create('help');
                    _this.panel1.element.css({
                        bottom: '0em'
                    });
                    _this.panel1.element.css({ top: '0px;', left: '410px;', bottom: '50%;', margin: '100px 50px 100px 450px' });
                    _this.panel1.header.closeButton;
                    _this.panel1.header.title = "Help";
                }
                else {
                    _this.panel1.close();
                }
                _this.panel1.body = helpDoc_1.helpDoc;
                _this.panel1.open();
            };
            /**************** form opening handler ***************/
            // Planification
            this.IsVisiblePlanning = false;
            // Extraction GP
            this.IsVisibleEP = false;
            // Extraction U
            this.IsVisibleSR = false;
            // Create
            this.IsVisibleCR = false;
            // Validate
            this.IsVisibleV = false;
            // Delivery
            this.IsVisibleD = false;
            // Cleaning
            this.IsVisibleCL = false;
            // Cancel
            this.IsVisibleCA = false;
            // Additionnal tool
            this.IsVisibleUT = false;
            //permet d'afficher ou cacher le formulaire en cliquant sur le titre
            this.ShowHide = function () {
                if (log.getEnvironnementSel() !== '' && log.getCloseable() === true) {
                    _this.IsVisiblePlanning = _this.IsVisiblePlanning ? false : true;
                    if (_this.IsVisiblePlanning == true) {
                        //hide non-selected
                        _this.IsVisibleEP = false;
                        _this.IsVisibleSR = false;
                        _this.IsVisibleCR = false;
                        _this.IsVisibleV = false;
                        _this.IsVisibleD = false;
                        _this.IsVisibleCL = false;
                        _this.IsVisibleCA = false;
                        _this.IsVisibleUT = false;
                        //highlight
                        _this.SelectedMenuP = {
                            'opacity': '1',
                        };
                        _this.SelectedMenuE = {};
                        _this.SelectedMenuEU = {};
                        _this.SelectedMenuCr = {};
                        _this.SelectedMenuV = {};
                        _this.SelectedMenuD = {};
                        _this.SelectedMenuC = {};
                        _this.SelectedMenuCa = {};
                        _this.SelectedMenuUT = {};
                    }
                    else {
                        _this.SelectedMenuP = {};
                    }
                }
            };
            this.setColorP = function () {
                if (log.getCloseable() === false) {
                    _this.SelectedMenuP = {
                        "background-color": "red",
                    };
                    log.setCloseable(true);
                }
                else {
                    _this.SelectedMenuP = {
                        "background-color": "green",
                    };
                }
            };
            //permet d'afficher ou cacher le formulaire en cliquant sur le titre
            this.ShowHideEX = function () {
                if (log.getEnvironnementSel() !== '' && log.getCloseable() === true) {
                    _this.IsVisibleEP = _this.IsVisibleEP ? false : true;
                    if (_this.IsVisibleEP === true) {
                        //Advanced Setting
                        if (log.getAdvanced() === true) {
                            _this.AdvancedVisible = true;
                        }
                        else {
                            _this.AdvancedVisible = false;
                        }
                        //hide non-selected
                        _this.IsVisiblePlanning = false;
                        _this.IsVisibleSR = false;
                        _this.IsVisibleCR = false;
                        _this.IsVisibleV = false;
                        _this.IsVisibleD = false;
                        _this.IsVisibleCL = false;
                        _this.IsVisibleCA = false;
                        _this.IsVisibleUT = false;
                        //highlight
                        _this.SelectedMenuE = {
                            'opacity': '1',
                        };
                        _this.SelectedMenuP = {};
                        _this.SelectedMenuEU = {};
                        _this.SelectedMenuCr = {};
                        _this.SelectedMenuV = {};
                        _this.SelectedMenuD = {};
                        _this.SelectedMenuC = {};
                        _this.SelectedMenuCa = {};
                        _this.SelectedMenuUT = {};
                    }
                    else {
                        _this.SelectedMenuE = {};
                    }
                }
            };
            this.setColorE = function () {
                if (log.getCloseable() === false) {
                    _this.SelectedMenuE = {
                        "background-color": "red",
                    };
                    log.setCloseable(true);
                }
                else {
                    _this.SelectedMenuE = {
                        "background-color": "green",
                    };
                }
            };
            //permet d'afficher ou cacher le formulaire en cliquant sur le titre
            this.ShowHideEXSR = function () {
                if (log.getEnvironnementSel() !== '' && log.getCloseable() === true) {
                    _this.IsVisibleSR = _this.IsVisibleSR ? false : true;
                    if (_this.IsVisibleSR === true) {
                        //Advanced Setting
                        if (log.getAdvanced() === true) {
                            _this.AdvancedVisible = true;
                        }
                        else {
                            _this.AdvancedVisible = false;
                        }
                        //hide non-selected
                        _this.IsVisiblePlanning = false;
                        _this.IsVisibleEP = false;
                        _this.IsVisibleCR = false;
                        _this.IsVisibleV = false;
                        _this.IsVisibleD = false;
                        _this.IsVisibleCL = false;
                        _this.IsVisibleCA = false;
                        _this.IsVisibleUT = false;
                        //highlight
                        _this.SelectedMenuEU = {
                            'opacity': '1',
                        };
                        _this.SelectedMenuE = {};
                        _this.SelectedMenuP = {};
                        _this.SelectedMenuCr = {};
                        _this.SelectedMenuV = {};
                        _this.SelectedMenuD = {};
                        _this.SelectedMenuC = {};
                        _this.SelectedMenuCa = {};
                        _this.SelectedMenuUT = {};
                    }
                    else {
                        _this.SelectedMenuEU = {};
                    }
                }
            };
            this.setColorEU = function () {
                if (log.getCloseable() === false) {
                    _this.SelectedMenuEU = {
                        "background-color": "red",
                    };
                    log.setCloseable(true);
                }
                else {
                    _this.SelectedMenuEU = {
                        "background-color": "green",
                    };
                }
            };
            //permet d'afficher ou cacher le formulaire en cliquant sur le titre
            this.ShowHideCr = function () {
                if (log.getEnvironnementSel() !== '' && log.getCloseable() === true) {
                    _this.IsVisibleCR = _this.IsVisibleCR ? false : true;
                    if (_this.IsVisibleCR === true) {
                        //hide non-selected
                        _this.IsVisiblePlanning = false;
                        _this.IsVisibleEP = false;
                        _this.IsVisibleSR = false;
                        _this.IsVisibleV = false;
                        _this.IsVisibleD = false;
                        _this.IsVisibleCL = false;
                        _this.IsVisibleCA = false;
                        _this.IsVisibleUT = false;
                        //highlight
                        _this.SelectedMenuCr = {
                            'opacity': '1',
                        };
                        _this.SelectedMenuEU = {};
                        _this.SelectedMenuE = {};
                        _this.SelectedMenuP = {};
                        _this.SelectedMenuV = {};
                        _this.SelectedMenuD = {};
                        _this.SelectedMenuC = {};
                        _this.SelectedMenuCa = {};
                        _this.SelectedMenuUT = {};
                    }
                    else {
                        _this.SelectedMenuCr = {};
                    }
                }
            };
            this.setColorCr = function () {
                if (log.getCloseable() === false) {
                    _this.SelectedMenuCr = {
                        "background-color": "red",
                    };
                    log.setCloseable(true);
                }
                else {
                    _this.SelectedMenuCr = {
                        "background-color": "green",
                    };
                }
            };
            //permet d'afficher ou cacher le formulaire en cliquant sur le titre
            this.ShowHideV = function () {
                if (log.getEnvironnementSel() !== '' && log.getCloseable() === true) {
                    _this.IsVisibleV = _this.IsVisibleV ? false : true;
                    if (_this.IsVisibleV === true) {
                        //hide non-selected
                        _this.IsVisiblePlanning = false;
                        _this.IsVisibleEP = false;
                        _this.IsVisibleSR = false;
                        _this.IsVisibleCR = false;
                        _this.IsVisibleD = false;
                        _this.IsVisibleCL = false;
                        _this.IsVisibleCA = false;
                        _this.IsVisibleUT = false;
                        //highlight
                        _this.SelectedMenuV = {
                            'opacity': '1',
                        };
                        _this.SelectedMenuCr = {};
                        _this.SelectedMenuEU = {};
                        _this.SelectedMenuE = {};
                        _this.SelectedMenuP = {};
                        _this.SelectedMenuD = {};
                        _this.SelectedMenuC = {};
                        _this.SelectedMenuCa = {};
                        _this.SelectedMenuUT = {};
                    }
                    else {
                        _this.SelectedMenuV = {};
                    }
                }
            };
            this.setColorV = function () {
                if (log.getCloseable() === false) {
                    _this.SelectedMenuV = {
                        "background-color": "red",
                    };
                    log.setCloseable(true);
                }
                else {
                    _this.SelectedMenuV = {
                        "background-color": "green",
                    };
                }
            };
            //permet d'afficher ou cacher le formulaire en cliquant sur le titre
            this.ShowHideD = function () {
                if (log.getEnvironnementSel() !== '' && log.getCloseable() === true) {
                    _this.IsVisibleD = _this.IsVisibleD ? false : true;
                    if (_this.IsVisibleD === true) {
                        //Advanced Setting
                        if (log.getAdvanced() === true) {
                            _this.AdvancedVisible = true;
                        }
                        else {
                            _this.AdvancedVisible = false;
                        }
                        //hide non-selected
                        _this.IsVisiblePlanning = false;
                        _this.IsVisibleEP = false;
                        _this.IsVisibleSR = false;
                        _this.IsVisibleCR = false;
                        _this.IsVisibleV = false;
                        _this.IsVisibleCL = false;
                        _this.IsVisibleCA = false;
                        _this.IsVisibleUT = false;
                        //highlight
                        _this.SelectedMenuD = {
                            'opacity': '1',
                        };
                        _this.SelectedMenuP = {};
                        _this.SelectedMenuE = {};
                        _this.SelectedMenuEU = {};
                        _this.SelectedMenuCr = {};
                        _this.SelectedMenuV = {};
                        _this.SelectedMenuC = {};
                        _this.SelectedMenuCa = {};
                        _this.SelectedMenuUT = {};
                    }
                    else {
                        _this.SelectedMenuD = {};
                    }
                }
            };
            this.setColorD = function () {
                if (log.getCloseable() === false) {
                    _this.SelectedMenuD = {
                        "background-color": "red",
                    };
                    log.setCloseable(true);
                }
                else {
                    _this.SelectedMenuD = {
                        "background-color": "green",
                    };
                }
            };
            //permet d'afficher ou cacher le formulaire en cliquant sur le titre
            this.ShowHideCl = function () {
                if (log.getEnvironnementSel() !== '' && log.getCloseable() === true) {
                    _this.IsVisibleCL = _this.IsVisibleCL ? false : true;
                    if (_this.IsVisibleCL === true) {
                        //hide non-selected
                        _this.IsVisiblePlanning = false;
                        _this.IsVisibleEP = false;
                        _this.IsVisibleSR = false;
                        _this.IsVisibleCR = false;
                        _this.IsVisibleV = false;
                        _this.IsVisibleD = false;
                        _this.IsVisibleCA = false;
                        _this.IsVisibleUT = false;
                        //highlight
                        _this.SelectedMenuC = {
                            'opacity': '1',
                        };
                        _this.SelectedMenuD = {};
                        _this.SelectedMenuP = {};
                        _this.SelectedMenuE = {};
                        _this.SelectedMenuEU = {};
                        _this.SelectedMenuCr = {};
                        _this.SelectedMenuV = {};
                        _this.SelectedMenuCa = {};
                        _this.SelectedMenuUT = {};
                    }
                    else {
                        _this.SelectedMenuC = {};
                    }
                }
            };
            this.setColorCl = function () {
                if (log.getCloseable() === false) {
                    _this.SelectedMenuC = {
                        "background-color": "red",
                    };
                    log.setCloseable(true);
                }
                else {
                    _this.SelectedMenuC = {
                        "background-color": "green",
                    };
                }
            };
            //permet d'afficher ou cacher le formulaire en cliquant sur le titre
            this.ShowHideCa = function () {
                if (log.getEnvironnementSel() !== '' && log.getCloseable() === true) {
                    _this.IsVisibleCA = _this.IsVisibleCA ? false : true;
                    if (_this.IsVisibleCA === true) {
                        //hide non-selected
                        _this.IsVisiblePlanning = false;
                        _this.IsVisibleEP = false;
                        _this.IsVisibleSR = false;
                        _this.IsVisibleCR = false;
                        _this.IsVisibleV = false;
                        _this.IsVisibleD = false;
                        _this.IsVisibleCL = false;
                        _this.IsVisibleUT = false;
                        //highlight
                        _this.SelectedMenuCa = {
                            'opacity': '1',
                        };
                        _this.SelectedMenuC = {};
                        _this.SelectedMenuD = {};
                        _this.SelectedMenuP = {};
                        _this.SelectedMenuE = {};
                        _this.SelectedMenuEU = {};
                        _this.SelectedMenuCr = {};
                        _this.SelectedMenuV = {};
                        _this.SelectedMenuUT = {};
                    }
                    else {
                        _this.SelectedMenuCa = {};
                    }
                }
            };
            this.setColorCa = function () {
                if (log.getCloseable() === false) {
                    _this.SelectedMenuCa = {
                        "background-color": "red",
                    };
                    log.setCloseable(true);
                }
                else {
                    _this.SelectedMenuCa = {
                        "background-color": "green",
                    };
                }
            };
            //permet d'afficher ou cacher le formulaire en cliquant sur le titre
            this.ShowHideUT = function () {
                if (log.getEnvironnementSel() !== '' && log.getCloseable() === true) {
                    _this.IsVisibleUT = _this.IsVisibleUT ? false : true;
                    if (_this.IsVisibleUT === true) {
                        //hide non-selected
                        _this.IsVisiblePlanning = false;
                        _this.IsVisibleEP = false;
                        _this.IsVisibleSR = false;
                        _this.IsVisibleCR = false;
                        _this.IsVisibleV = false;
                        _this.IsVisibleD = false;
                        _this.IsVisibleCL = false;
                        _this.IsVisibleCA = false;
                        //highlight
                        _this.SelectedMenuUT = {
                            'opacity': '1',
                        };
                        _this.SelectedMenuE = {};
                        _this.SelectedMenuEU = {};
                        _this.SelectedMenuP = {};
                        _this.SelectedMenuCr = {};
                        _this.SelectedMenuV = {};
                        _this.SelectedMenuD = {};
                        _this.SelectedMenuC = {};
                        _this.SelectedMenuCa = {};
                    }
                    else {
                        _this.SelectedMenuUT = {};
                    }
                }
            };
        });
    };
    /**
     *
     * @param {User} log
     * @param {*} mapApi
     * @memberof TopMenuController
     */
    TopMenuController.prototype.controlUserInfo = function (log, mapApi) {
        mapApi.agControllerRegister('infoUserCtrl', function () {
            //this.emailUser = 'jean-sebastien.bruneau-blais@canada.ca';
            this.checkAdvanced = log.getAdvanced();
            this.changeEmail = function () {
                alert('hello');
            };
            this.checkingAdvanced = function () {
                if (log.getAdvanced() === true) {
                    log.setAdvanced(false);
                }
                else {
                    log.setAdvanced(true);
                }
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
