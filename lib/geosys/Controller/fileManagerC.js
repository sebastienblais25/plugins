"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FileManagerController = /** @class */ (function () {
    function FileManagerController() {
    }
    FileManagerController.prototype.fileManagercontrols = function (log, mapApi, tfm) {
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
                        _this.panel.header.toggleButton;
                        _this.panel.header.closeButton;
                        _this.panel.header.title = "File Manager (Alpha testing)";
                        var fmc = new FileManagerController();
                        var output = tfm.buildUI();
                        if (tfm._nextFolder == 'root') {
                            tfm.obtainArbo(log);
                            fmc.testFileManager(log, mapApi, tfm, _this.panel);
                            _this.panel.body = output;
                        }
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
    FileManagerController.prototype.testFileManager = function (log, mapApi, tfm, panel) {
        mapApi.agControllerRegister('fileManagerPanelCtrl', function ($scope) {
            this.folders = [];
            this.files = [];
            this.breadcrumbs = tfm._breadcrumbs;
            this.folders = tfm.buildFolderList();
            this.files = tfm.buildFileList();
            this.followup = function (folder) {
                tfm.setbreacrumbsForNav(folder);
                var fmc = new FileManagerController();
                var output = tfm.buildUI();
                tfm.obtainArbo(log);
                fmc.testFileManager(log, mapApi, tfm, panel);
                panel.body = output;
            };
            this.openFolder = function (folder) {
                tfm.setNextFolder(folder.name);
                tfm._breadcrumbs = tfm._breadcrumbs + '/' + tfm._nextFolder;
                var fmc = new FileManagerController();
                var output = tfm.buildUI();
                tfm.obtainArbo(log);
                fmc.testFileManager(log, mapApi, tfm, panel);
                panel.body = output;
            };
            this.downloadFile = function (file) {
                alert(file.name + ' downloaded from ' + tfm._breadcrumbs);
            };
            this.deleteFile = function (file) {
                alert(file.name + ' deleted from ' + tfm._breadcrumbs);
            };
            //upload in JQuery
        });
    };
    return FileManagerController;
}());
exports.FileManagerController = FileManagerController;
