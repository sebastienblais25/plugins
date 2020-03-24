"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dragndrop_1 = require("../javascript/dragndrop");
var FileSaver = require('file-saver'); // le import
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
                    //if the panel already exist
                    if (!_this.panel) {
                        // make sure both header and body have a digest cycle run on them
                        _this.panel = mapApi.panels.create('FileManager');
                        //Size of the panel
                        _this.panel.element.css({ top: '0px;', margin: '100px 50px 100px 450px' });
                        //button in the header of the panel
                        _this.panel.header.toggleButton;
                        _this.panel.header.closeButton;
                        //title on the panel
                        _this.panel.header.title = "File Manager (Alpha testing)";
                        var fmc = new FileManagerController();
                        //build the UI for the file manager
                        var output = tfm.buildUI() + dragndrop_1.dragdropFunction;
                        if (tfm._nextFolder == 'root') {
                            tfm.obtainArbo(log);
                            fmc.FileManaManager(log, mapApi, tfm, _this.panel);
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
    FileManagerController.prototype.FileManaManager = function (log, mapApi, tfm, panel) {
        mapApi.agControllerRegister('fileManagerPanelCtrl', function ($scope) {
            var _this = this;
            //building the list of folder and file
            this.folders = [];
            this.files = [];
            this.breadcrumbs = tfm._breadcrumbs;
            this.folders = tfm.buildFolderList();
            this.files = tfm.buildFileList();
            //click on the left arrow to back one folder
            this.precedent = function () {
                var rank = tfm._list.length - 2;
                if (rank >= 0) {
                    tfm.setbreacrumbsForNav(rank.toString());
                    var fmc = new FileManagerController();
                    var output = tfm.buildUI() + dragndrop_1.dragdropFunction;
                    tfm.obtainArbo(log);
                    fmc.FileManaManager(log, mapApi, tfm, panel);
                    panel.body = output;
                }
            };
            //refresh the folder 
            this.refresh = function () {
                var fmc = new FileManagerController();
                var output = tfm.buildUI();
                tfm.obtainArbo(log);
                fmc.FileManaManager(log, mapApi, tfm, panel);
                panel.body = output;
            };
            //open the folder from the breadcrumbs
            this.followup = function (folder) {
                tfm.setbreacrumbsForNav(folder);
                var fmc = new FileManagerController();
                var output = tfm.buildUI() + dragndrop_1.dragdropFunction;
                tfm.obtainArbo(log);
                fmc.FileManaManager(log, mapApi, tfm, panel);
                panel.body = output;
            };
            //open a folder when clicked
            this.openFolder = function (folder) {
                tfm.setNextFolder(folder.name);
                tfm._breadcrumbs = tfm._breadcrumbs + '/' + tfm._nextFolder;
                var fmc = new FileManagerController();
                var output = tfm.buildUI();
                tfm.obtainArbo(log);
                fmc.FileManaManager(log, mapApi, tfm, panel);
                panel.body = output;
            };
            //download file on download button clicked
            this.downloadFile = function (file) {
                tfm.downloadFile(file.name, tfm._breadcrumbs, log);
            };
            //delete file on delete button clicked
            this.deleteFile = function (file) {
                tfm.deleteFile(file.name, tfm._breadcrumbs, log);
            };
            //download file on download button clicked
            this.downloadFolder = function (folder) {
                tfm.downloadFolder(folder.name, tfm._breadcrumbs, log);
            };
            //delete file on delete button clicked
            this.deleteFolder = function (folder) {
                tfm.deleteFolder(folder.name, tfm._breadcrumbs, log);
            };
            //create a new folder
            this.createFolder = function () {
                //alert('creating new folder')
                if (!_this.panel1) {
                    // make sure both header and body have a digest cycle run on them
                    _this.panel1 = mapApi.panels.create('AddFolder');
                    _this.panel1.element.css({
                        bottom: '0em',
                        width: '300px',
                        height: '200px'
                    });
                    _this.panel1.element.css({ top: '0px;', margin: '200px 50px 100px 650px' });
                    _this.panel1.header.closeButton;
                    _this.panel1.header.title = "Add Folder";
                    var fmc = new FileManagerController();
                    fmc.addingFolder(log, tfm, mapApi);
                    var output = "<div ng-controller=\"folderCtrl as ctrl16\">\n                    <md-input-container style=\"margin-bottom: 0px;height: 34px; width:275px; \">\n                        <label>Name the folder</label>\n                        <input type=\"text\" ng-model=\"ctrl16.nameFolder\"/>\n                    </md-input-container>\n                    <md-input-container style=\"float:right;\">\n                        <md-button class=\"md-raised\" ng-click=\"ctrl16.addfolder()\">\n                            add Folder\n                        </md-button>\n                    </md-input-container>\n                    </div>";
                    _this.panel1.body = output;
                }
                else {
                    _this.panel1.close();
                }
                _this.panel1.open();
            };
            //upload file on drag and drop of file
            this.uploadFile = function () {
                //alert("hello")
                var file = document.getElementById('fileInput').files[0];
                tfm.uploadfile(tfm._breadcrumbs, log, file);
                //let blob = new Blob([file],{type:"application/json"});
                //FileSaver.saveAs(blob,file.name);
            };
        });
    };
    //the panel to name the new folder and add the new folder in thje directory
    FileManagerController.prototype.addingFolder = function (log, tfm, mapApi) {
        mapApi.agControllerRegister('folderCtrl', function ($scope) {
            var _this = this;
            this.addfolder = function () {
                tfm.createFolder(tfm._breadcrumbs, log, _this.nameFolder);
            };
        });
    };
    return FileManagerController;
}());
exports.FileManagerController = FileManagerController;
