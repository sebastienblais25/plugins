"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FileManagerController = /** @class */ (function () {
    function FileManagerController() {
    }
    FileManagerController.prototype.fileManagercontrols = function (log, mapApi) {
        /************ À placer en fonction ou class ***********/
        // TODO: creer la directive avant de compiler le code
        mapApi.agControllerRegister('FileManagerCtrl', function ($scope) {
            var _this = this;
            //permet d'afficher ou chacher le formulaire en cliquant sur le titre
            this.OpenFileManager = function () {
                if (log._environnementSel != '') {
                    $scope.SelectedMenuFM = {
                        "background-color": "blue",
                    };
                    if (!_this.panel) {
                        // make sure both header and body have a digest cycle run on them
                        _this.panel = mapApi.panels.create('FileManager');
                        _this.panel.element.css({
                            bottom: '0em',
                        });
                        _this.panel.element.css({ top: '0px;', margin: '100px 50px 100px 450px' });
                        var closeBtn = _this.panel.header.closeButton;
                        _this.panel.header.title = "File Manager";
                    }
                    else {
                        _this.panel.close();
                    }
                    _this.panel.open();
                }
            };
        });
    };
    ;
    return FileManagerController;
}());
exports.FileManagerController = FileManagerController;
