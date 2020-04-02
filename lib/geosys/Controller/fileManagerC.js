"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dragndrop_1 = require("../javascript/dragndrop");
var FileManagerController = /** @class */ (function () {
    function FileManagerController() {
    }
    /**
     * Create the first panel for the with the root
     * @param {User} log for the token and other useful tools
     * @param {*} mapApi The object of the API
     * @param {FileMana} tfm the object File Manager to keep where you are in a repository
     * @memberof FileManagerController
     */
    FileManagerController.prototype.fileManagercontrols = function (log, mapApi, tfm) {
        mapApi.agControllerRegister('FileManagerCtrl', function () {
            var _this = this;
            //permet d'afficher ou chacher le formulaire en cliquant sur le titre
            this.OpenFileManager = function () {
                if (log.getEnvironnementSel() !== '') {
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
                        if (tfm.getNextFolder() == 'root') {
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
    /**
     * Create the panel body when a folder is clicked
     * @param {User} log User tools
     * @param {*} mapApi the map Object
     * @param {FileMana} tfm to keep track where you are
     * @param {*} panel the panel to add the body
     * @memberof FileManagerController
     */
    FileManagerController.prototype.FileManaManager = function (log, mapApi, tfm, panel) {
        mapApi.agControllerRegister('fileManagerPanelCtrl', function () {
            var _this = this;
            //building the list of folder and file
            this.folders = [];
            this.files = [];
            this.breadcrumbs = tfm.getBreadcrumbs();
            this.folders = tfm.buildFolderList();
            this.files = tfm.buildFileList();
            //click on the left arrow to back one folder
            this.precedent = function () {
                var rank = tfm.getList().length - 2;
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
                tfm.setBreadcrumbs(tfm.getBreadcrumbs() + '/' + tfm.getNextFolder());
                var fmc = new FileManagerController();
                var output = tfm.buildUI();
                tfm.obtainArbo(log);
                fmc.FileManaManager(log, mapApi, tfm, panel);
                panel.body = output;
            };
            //download file on download button clicked
            this.downloadFile = function (file) {
                tfm.downloadFile(file.name, tfm.getBreadcrumbs(), log);
            };
            //delete file on delete button clicked
            this.deleteFile = function (file) {
                tfm.deleteFile(file.name, tfm.getBreadcrumbs(), log);
            };
            //download file on download button clicked
            this.downloadFolder = function (folder) {
                tfm.downloadFolder(folder.name, tfm.getBreadcrumbs(), log);
            };
            //delete file on delete button clicked
            this.deleteFolder = function (folder) {
                tfm.deleteFolder(folder.name, tfm.getBreadcrumbs(), log);
            };
            //create a new folder
            this.createFolder = function () {
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
                var file = document.getElementById('fileInput').files[0];
                tfm.uploadfile(tfm.getBreadcrumbs(), log, file);
            };
        });
    };
    //the panel to name the new folder and add the new folder in thje directory
    FileManagerController.prototype.addingFolder = function (log, tfm, mapApi) {
        mapApi.agControllerRegister('folderCtrl', function () {
            var _this = this;
            this.addfolder = function () {
                tfm.createFolder(tfm.getBreadcrumbs(), log, _this.nameFolder);
            };
        });
    };
    return FileManagerController;
}());
exports.FileManagerController = FileManagerController;
