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
     * @param {User} log getting all the information of the user and getting the envrionnemnt h'es already in
     * @param {*} mapApi need the mapApi for setting the controller.
     * @memberof manageController
     */
    TopMenuController.prototype.topmenuControl = function (log, mapApi, panel) {
        mapApi.agControllerRegister('topmenuCtrl', function ($scope) {
            var _this = this;
            var that = this;
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
                        "background-color": "lightgreen",
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
                var output = infoUser_1.infoUser.replace('(username)', log.getusername() + ' ' + log.getpassword());
                output = output.replace('(theme)', log.getAllThemeNAme());
                output = output.replace('(right)', log.getrightRead() + ' ' + log.getrightWrite());
                output = output.replace('(equipe)', log._equipe._id);
                output = output.replace('(envir)', log._environnementSel + '  </br>URL : ' + log._urlEnvselected);
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
            $scope.IsVisibleP = false;
            $scope.IsVisibleEP = false;
            $scope.IsVisibleSR = false;
            $scope.IsVisibleCR = false;
            $scope.IsVisibleV = false;
            $scope.IsVisibleD = false;
            $scope.IsVisibleCL = false;
            $scope.IsVisibleCA = false;
            $scope.IsVisibleUT = false;
            //permet d'afficher ou cacher le formulaire en cliquant sur le titre
            this.ShowHide = function () {
                if (log._environnementSel != '' && log._closeable == true) {
                    $scope.IsVisibleP = $scope.IsVisibleP ? false : true;
                    if ($scope.IsVisibleP == true) {
                        //hide non-selected
                        $scope.IsVisibleEP = false;
                        $scope.IsVisibleSR = false;
                        $scope.IsVisibleCR = false;
                        $scope.IsVisibleV = false;
                        $scope.IsVisibleD = false;
                        $scope.IsVisibleCL = false;
                        $scope.IsVisibleCA = false;
                        $scope.IsVisibleUT = false;
                        //highlight
                        $scope.SelectedMenuP = {
                            "opacity": "1",
                        };
                        $scope.SelectedMenuE = {};
                        $scope.SelectedMenuEU = {};
                        $scope.SelectedMenuCr = {};
                        $scope.SelectedMenuV = {};
                        $scope.SelectedMenuD = {};
                        $scope.SelectedMenuC = {};
                        $scope.SelectedMenuCa = {};
                        $scope.SelectedMenuUT = {};
                    }
                    else {
                        $scope.SelectedMenuP = {};
                    }
                }
                else {
                    log._closeable = true;
                }
            };
            //permet d'afficher ou cacher le formulaire en cliquant sur le titre
            this.ShowHideEX = function () {
                if (log._environnementSel != '' && log._closeable == true) {
                    $scope.IsVisibleEP = $scope.IsVisibleEP ? false : true;
                    if ($scope.IsVisibleEP == true) {
                        //Advanced Setting
                        if (log._advanced == true) {
                            $scope.AdvancedVisible = true;
                        }
                        else {
                            $scope.AdvancedVisible = false;
                        }
                        //hide non-selected
                        $scope.IsVisibleP = false;
                        $scope.IsVisibleSR = false;
                        $scope.IsVisibleCR = false;
                        $scope.IsVisibleV = false;
                        $scope.IsVisibleD = false;
                        $scope.IsVisibleCL = false;
                        $scope.IsVisibleCA = false;
                        $scope.IsVisibleUT = false;
                        //highlight
                        $scope.SelectedMenuE = {
                            "opacity": "1",
                        };
                        $scope.SelectedMenuP = {};
                        $scope.SelectedMenuEU = {};
                        $scope.SelectedMenuCr = {};
                        $scope.SelectedMenuV = {};
                        $scope.SelectedMenuD = {};
                        $scope.SelectedMenuC = {};
                        $scope.SelectedMenuCa = {};
                        $scope.SelectedMenuUT = {};
                    }
                    else {
                        $scope.SelectedMenuE = {};
                    }
                }
                else {
                    log._closeable = true;
                }
            };
            //permet d'afficher ou cacher le formulaire en cliquant sur le titre
            this.ShowHideEXSR = function () {
                if (log._environnementSel != '' && log._closeable == true) {
                    $scope.IsVisibleSR = $scope.IsVisibleSR ? false : true;
                    if ($scope.IsVisibleSR == true) {
                        //Advanced Setting
                        if (log._advanced == true) {
                            $scope.AdvancedVisible = true;
                        }
                        else {
                            $scope.AdvancedVisible = false;
                        }
                        //hide non-selected
                        $scope.IsVisibleP = false;
                        $scope.IsVisibleEP = false;
                        $scope.IsVisibleCR = false;
                        $scope.IsVisibleV = false;
                        $scope.IsVisibleD = false;
                        $scope.IsVisibleCL = false;
                        $scope.IsVisibleCA = false;
                        $scope.IsVisibleUT = false;
                        //highlight
                        $scope.SelectedMenuEU = {
                            "opacity": "1",
                        };
                        $scope.SelectedMenuE = {};
                        $scope.SelectedMenuP = {};
                        $scope.SelectedMenuCr = {};
                        $scope.SelectedMenuV = {};
                        $scope.SelectedMenuD = {};
                        $scope.SelectedMenuC = {};
                        $scope.SelectedMenuCa = {};
                        $scope.SelectedMenuUT = {};
                    }
                    else {
                        $scope.SelectedMenuEU = {};
                    }
                }
                else {
                    log._closeable = true;
                }
            };
            //permet d'afficher ou cacher le formulaire en cliquant sur le titre
            this.ShowHideCr = function () {
                if (log._environnementSel != '' && log._closeable == true) {
                    $scope.IsVisibleCR = $scope.IsVisibleCR ? false : true;
                    if ($scope.IsVisibleCR == true) {
                        document.getElementsByClassName('panel-body')[7].setAttribute('id', 'scrolling');
                        var myElement = document.getElementById('create');
                        /*$( "#create" ).click(function() {
                            var container = document.getElementById('scrolling');
                            var scrollTo = document.getElementById('create');
                            container.scrollTop = scrollTo.offsetTop - 30;
                        });*/
                        //let topPos = myElement.offsetTop;
                        //console.log(panel.body);
                        //document.getElementById('scrolling').scrollTop = topPos;
                        //hide non-selected
                        $scope.IsVisibleP = false;
                        $scope.IsVisibleEP = false;
                        $scope.IsVisibleSR = false;
                        $scope.IsVisibleV = false;
                        $scope.IsVisibleD = false;
                        $scope.IsVisibleCL = false;
                        $scope.IsVisibleCA = false;
                        $scope.IsVisibleUT = false;
                        //highlight
                        $scope.SelectedMenuCr = {
                            "opacity": "1",
                        };
                        $scope.SelectedMenuEU = {};
                        $scope.SelectedMenuE = {};
                        $scope.SelectedMenuP = {};
                        $scope.SelectedMenuV = {};
                        $scope.SelectedMenuD = {};
                        $scope.SelectedMenuC = {};
                        $scope.SelectedMenuCa = {};
                        $scope.SelectedMenuUT = {};
                    }
                    else {
                        $scope.SelectedMenuCr = {};
                    }
                }
                else {
                    log._closeable = true;
                }
            };
            //permet d'afficher ou cacher le formulaire en cliquant sur le titre
            this.ShowHideV = function () {
                if (log._environnementSel != '' && log._closeable == true) {
                    $scope.IsVisibleV = $scope.IsVisibleV ? false : true;
                    if ($scope.IsVisibleV == true) {
                        //hide non-selected
                        $scope.IsVisibleP = false;
                        $scope.IsVisibleEP = false;
                        $scope.IsVisibleSR = false;
                        $scope.IsVisibleCR = false;
                        $scope.IsVisibleD = false;
                        $scope.IsVisibleCL = false;
                        $scope.IsVisibleCA = false;
                        $scope.IsVisibleUT = false;
                        //highlight
                        $scope.SelectedMenuV = {
                            "opacity": "1",
                        };
                        $scope.SelectedMenuCr = {};
                        $scope.SelectedMenuEU = {};
                        $scope.SelectedMenuE = {};
                        $scope.SelectedMenuP = {};
                        $scope.SelectedMenuD = {};
                        $scope.SelectedMenuC = {};
                        $scope.SelectedMenuCa = {};
                        $scope.SelectedMenuUT = {};
                    }
                    else {
                        $scope.SelectedMenuV = {};
                    }
                }
                else {
                    log._closeable = true;
                }
            };
            //permet d'afficher ou cacher le formulaire en cliquant sur le titre
            this.ShowHideD = function () {
                if (log._environnementSel != '' && log._closeable == true) {
                    $scope.IsVisibleD = $scope.IsVisibleD ? false : true;
                    if ($scope.IsVisibleD == true) {
                        //Advanced Setting
                        if (log._advanced == true) {
                            $scope.AdvancedVisible = true;
                        }
                        else {
                            $scope.AdvancedVisible = false;
                        }
                        //hide non-selected
                        $scope.IsVisibleP = false;
                        $scope.IsVisibleEP = false;
                        $scope.IsVisibleSR = false;
                        $scope.IsVisibleCR = false;
                        $scope.IsVisibleV = false;
                        $scope.IsVisibleCL = false;
                        $scope.IsVisibleCA = false;
                        $scope.IsVisibleUT = false;
                        //highlight
                        $scope.SelectedMenuD = {
                            "opacity": "1",
                        };
                        $scope.SelectedMenuP = {};
                        $scope.SelectedMenuE = {};
                        $scope.SelectedMenuEU = {};
                        $scope.SelectedMenuCr = {};
                        $scope.SelectedMenuV = {};
                        $scope.SelectedMenuC = {};
                        $scope.SelectedMenuCa = {};
                        $scope.SelectedMenuUT = {};
                    }
                    else {
                        $scope.SelectedMenuD = {};
                    }
                }
                else {
                    log._closeable = true;
                }
            };
            //permet d'afficher ou cacher le formulaire en cliquant sur le titre
            this.ShowHideCl = function () {
                if (log._environnementSel != '' && log._closeable == true) {
                    $scope.IsVisibleCL = $scope.IsVisibleCL ? false : true;
                    if ($scope.IsVisibleCL == true) {
                        //hide non-selected
                        $scope.IsVisibleP = false;
                        $scope.IsVisibleEP = false;
                        $scope.IsVisibleSR = false;
                        $scope.IsVisibleCR = false;
                        $scope.IsVisibleV = false;
                        $scope.IsVisibleD = false;
                        $scope.IsVisibleCA = false;
                        $scope.IsVisibleUT = false;
                        //highlight
                        $scope.SelectedMenuC = {
                            "opacity": "1",
                        };
                        $scope.SelectedMenuD = {};
                        $scope.SelectedMenuP = {};
                        $scope.SelectedMenuE = {};
                        $scope.SelectedMenuEU = {};
                        $scope.SelectedMenuCr = {};
                        $scope.SelectedMenuV = {};
                        $scope.SelectedMenuCa = {};
                        $scope.SelectedMenuUT = {};
                    }
                    else {
                        $scope.SelectedMenuC = {};
                    }
                }
                else {
                    log._closeable = true;
                }
            };
            //permet d'afficher ou cacher le formulaire en cliquant sur le titre
            this.ShowHideCa = function () {
                if (log._environnementSel != '' && log._closeable == true) {
                    $scope.IsVisibleCA = $scope.IsVisibleCA ? false : true;
                    if ($scope.IsVisibleCA == true) {
                        //hide non-selected
                        $scope.IsVisibleP = false;
                        $scope.IsVisibleEP = false;
                        $scope.IsVisibleSR = false;
                        $scope.IsVisibleCR = false;
                        $scope.IsVisibleV = false;
                        $scope.IsVisibleD = false;
                        $scope.IsVisibleCL = false;
                        $scope.IsVisibleUT = false;
                        //highlight
                        $scope.SelectedMenuCa = {
                            "opacity": "1",
                        };
                        $scope.SelectedMenuC = {};
                        $scope.SelectedMenuD = {};
                        $scope.SelectedMenuP = {};
                        $scope.SelectedMenuE = {};
                        $scope.SelectedMenuEU = {};
                        $scope.SelectedMenuCr = {};
                        $scope.SelectedMenuV = {};
                        $scope.SelectedMenuUT = {};
                    }
                    else {
                        $scope.SelectedMenuCa = {};
                    }
                }
                else {
                    log._closeable = true;
                }
            };
            //permet d'afficher ou cacher le formulaire en cliquant sur le titre
            this.ShowHideUT = function () {
                if (log._environnementSel != '' && log._closeable == true) {
                    $scope.IsVisibleUT = $scope.IsVisibleUT ? false : true;
                    if ($scope.IsVisibleUT == true) {
                        //hide non-selected
                        $scope.IsVisibleP = false;
                        $scope.IsVisibleEP = false;
                        $scope.IsVisibleSR = false;
                        $scope.IsVisibleCR = false;
                        $scope.IsVisibleV = false;
                        $scope.IsVisibleD = false;
                        $scope.IsVisibleCL = false;
                        $scope.IsVisibleCA = false;
                        //highlight
                        $scope.SelectedMenuUT = {
                            "opacity": "1",
                        };
                        $scope.SelectedMenuE = {};
                        $scope.SelectedMenuEU = {};
                        $scope.SelectedMenuP = {};
                        $scope.SelectedMenuCr = {};
                        $scope.SelectedMenuV = {};
                        $scope.SelectedMenuD = {};
                        $scope.SelectedMenuC = {};
                        $scope.SelectedMenuCa = {};
                    }
                    else {
                        $scope.SelectedMenuUT = {};
                    }
                }
                else {
                    log._closeable = true;
                }
            };
        });
    };
    /**
     *
     *
     * @param {User} log
     * @param {*} mapApi
     * @memberof TopMenuController
     */
    TopMenuController.prototype.controlUserInfo = function (log, mapApi) {
        mapApi.agControllerRegister('infoUserCtrl', function ($scope /*, $location, $anchorScroll*/) {
            this.emailUser = 'jean-sebastien.bruneau-blais@canada.ca';
            this.checkAdvanced = log._advanced;
            this.changeEmail = function () {
                alert('hello');
            };
            this.checkingAdvanced = function () {
                log._advanced = log._advanced ? false : true;
                //console.log(log._advanced);
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
