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
    FileManagerController.prototype.fileManagercontrols = function (token, mapApi, tfm, panel, panel1) {
        var _this = this;
        //if the panel already exist
        this.panel = panel;
        this.panel1 = panel1;
        //title on the panel
        this.panel.header.title = "{{ 'plugins.geosys.filem' | translate }}";
        var fmc = new FileManagerController();
        // make sure both header and body have a digest cycle run on them
        fmc.addingFolder(token, tfm, mapApi, this.panel, this.panel1);
        panel.body = tfm.buildHeaderFileManager() + "<br/><div class=\"loader\"></div>" + '<div>';
        //build the UI for the file manager
        var output = tfm.buildUI() + dragndrop_1.dragdropFunction;
        tfm.obtainArbo(token).then(function (values) {
            tfm.setValue(values);
            fmc.FileManaManager(token, mapApi, tfm, _this.panel, _this.panel1);
            _this.panel.body = output;
        });
        this.panel.open();
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
    FileManagerController.prototype.FileManaManager = function (token, mapApi, tfm, panel, panel1) {
        mapApi.agControllerRegister('fileManagerPanelCtrl', function () {
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
                    panel.body = tfm.buildHeaderFileManager() + "<br/><div class=\"loader\"></div>" + '<div>';
                    tfm.setbreacrumbsForNav(rank.toString());
                    var fmc_1 = new FileManagerController();
                    var output_1 = tfm.buildUI() + dragndrop_1.dragdropFunction;
                    tfm.obtainArbo(token).then(function (values) {
                        tfm.setValue(values);
                        fmc_1.FileManaManager(token, mapApi, tfm, panel, panel1);
                        panel.body = output_1;
                    });
                }
            };
            //refresh the folder 
            this.refresh = function () {
                panel.body = tfm.buildHeaderFileManager() + "<br/><div class=\"loader\"></div>" + '<div>';
                var fmc = new FileManagerController();
                var output = tfm.buildUI() + dragndrop_1.dragdropFunction;
                tfm.obtainArbo(token).then(function (values) {
                    tfm.setValue(values);
                    fmc.FileManaManager(token, mapApi, tfm, panel, panel1);
                    panel.body = output;
                });
            };
            //open the folder from the breadcrumbs
            this.followup = function (folder) {
                panel.body = tfm.buildHeaderFileManager() + "<br/><div class=\"loader\"></div>" + '<div>';
                tfm.setbreacrumbsForNav(folder);
                var fmc = new FileManagerController();
                var output = tfm.buildUI() + dragndrop_1.dragdropFunction;
                tfm.obtainArbo(token).then(function (values) {
                    tfm.setValue(values);
                    fmc.FileManaManager(token, mapApi, tfm, panel, panel1);
                    panel.body = output;
                });
            };
            //open a folder when clicked
            this.openFolder = function (folder) {
                panel.body = tfm.buildHeaderFileManager() + "<br/><div class=\"loader\"></div>" + '<div>';
                tfm.setNextFolder(folder.name);
                tfm.setBreadcrumbs(tfm.getBreadcrumbs() + '/' + tfm.getNextFolder());
                var fmc = new FileManagerController();
                var output = tfm.buildUI() + dragndrop_1.dragdropFunction;
                tfm.obtainArbo(token).then(function (values) {
                    tfm.setValue(values);
                    fmc.FileManaManager(token, mapApi, tfm, panel, panel1);
                    panel.body = output;
                });
            };
            //download file on download button clicked
            this.downloadFile = function (file) {
                tfm.downloadFile(file.name, tfm.getBreadcrumbs(), token);
            };
            //delete file on delete button clicked
            this.deleteFile = function (file) {
                tfm.deleteFile(file.name, tfm.getBreadcrumbs(), token);
                panel.body = tfm.buildHeaderFileManager() + "<br/><div class=\"loader\"></div>" + '<div>';
                var fmc = new FileManagerController();
                var output = tfm.buildUI() + dragndrop_1.dragdropFunction;
                tfm.obtainArbo(token).then(function (values) {
                    tfm.setValue(values);
                    fmc.FileManaManager(token, mapApi, tfm, panel, panel1);
                    panel.body = output;
                });
            };
            //download file on download button clicked
            this.downloadFolder = function (folder) {
                tfm.downloadFolder(folder.name, tfm.getBreadcrumbs(), token);
            };
            //delete file on delete button clicked
            this.deleteFolder = function (folder) {
                tfm.deleteFolder(folder.name, tfm.getBreadcrumbs(), token);
                panel.body = tfm.buildHeaderFileManager() + "<br/><div class=\"loader\"></div>" + '<div>';
                var fmc = new FileManagerController();
                var output = tfm.buildUI() + dragndrop_1.dragdropFunction;
                tfm.obtainArbo(token).then(function (values) {
                    tfm.setValue(values);
                    fmc.FileManaManager(token, mapApi, tfm, panel, panel1);
                    panel.body = output;
                });
            };
            //create a new folder
            this.createFolder = function () {
                var output = "<div ng-controller=\"folderCtrl as ctrl16\">\n                <md-input-container style=\"margin-bottom: 0px;height: 34px; width:275px; \">\n                    <label>Name the folder</label>\n                    <input type=\"text\" ng-model=\"ctrl16.nameFolder\"/>\n                </md-input-container>\n                <md-input-container style=\"float:right;\">\n                    <md-button class=\"md-raised\" ng-click=\"ctrl16.addfolder()\">\n                        add Folder\n                    </md-button>\n                </md-input-container>\n                </div>";
                panel1.body = output;
                panel1.open();
            };
            //upload file on drag and drop of file
            this.uploadFile = function () {
                var file = document.getElementById('fileInput').files[0];
                tfm.uploadfile(tfm.getBreadcrumbs(), token, file);
                panel.body = tfm.buildHeaderFileManager() + "<br/><div class=\"loader\"></div>" + '<div>';
                var fmc = new FileManagerController();
                var output = tfm.buildUI() + dragndrop_1.dragdropFunction;
                tfm.obtainArbo(token).then(function (values) {
                    tfm.setValue(values);
                    fmc.FileManaManager(token, mapApi, tfm, panel, panel1);
                    panel.body = output;
                });
            };
        });
    };
    /**
     * The panel to name the new folder and add the new folder in thje directory
     * @param {string} token
     * @param {FileMana} tfm
     * @param {*} mapApi
     * @memberof FileManagerController
     */
    FileManagerController.prototype.addingFolder = function (token, tfm, mapApi, panel, panel1) {
        mapApi.agControllerRegister('folderCtrl', function () {
            var _this = this;
            this.addfolder = function () {
                tfm.createFolder(tfm.getBreadcrumbs(), token, _this.nameFolder);
                panel1.close();
                panel.body = tfm.buildHeaderFileManager() + "<br/><div class=\"loader\"></div>" + '<div>';
                var fmc = new FileManagerController();
                var output = tfm.buildUI() + dragndrop_1.dragdropFunction;
                tfm.obtainArbo(token).then(function (values) {
                    tfm.setValue(values);
                    fmc.FileManaManager(token, mapApi, tfm, panel, panel1);
                    panel.body = output;
                });
            };
        });
    };
    return FileManagerController;
}());
exports.FileManagerController = FileManagerController;
