"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fileManagerC_1 = require("../../fileManager/controller/fileManagerC");
var fileMana_1 = require("../../fileManager/operation/fileMana");
var url_1 = require("../config/url");
var FileController = /** @class */ (function () {
    function FileController() {
    }
    /**
     * Create the first panel for the with the root
     * @param {User} log for the token and other useful tools
     * @param {*} mapApi The object of the API
     * @param {FileMana} tfm the object File Manager to keep where you are in a repository
     * @memberof FileManagerController
     */
    FileController.prototype.fileManagercontrols = function (log, mapApi) {
        mapApi.agControllerRegister('FileManagerCtrl', function () {
            var _this = this;
            // Set le starting Folder et toujours placer Root pour le premier paramètre
            var tfm = new fileMana_1.FileMana('root', ' ');
            // Set les Urls
            tfm.setUrl('hello', /*'http://127.0.0.1:4010/'*/ 'http://132.156.9.78:8080/geosys-api/v1/', url_1.urlListFile, url_1.urlFolderAction, url_1.urlFileAction, url_1.urlFileActionUpload);
            //permet d'afficher ou chacher le formulaire en cliquant sur le titre
            this.OpenFileManager = function () {
                // Check if an environnment is selected
                if (log.getEnvironnementSel() !== '') {
                    if (!_this.panel) {
                        // make sure both header and body have a digest cycle run on them
                        _this.panel = mapApi.panels.create('FileManager');
                        //Size of the panel
                        _this.panel.element.css({ top: '0px;', margin: '100px 50px 100px 450px' });
                        //button in the header of the panel
                        _this.panel.header.toggleButton;
                        _this.panel.header.closeButton;
                        _this.panel1 = mapApi.panels.create('AddFolder');
                        _this.panel1.element.css({
                            bottom: '0em',
                            width: '300px',
                            height: '200px'
                        });
                        _this.panel1.element.css({ top: '0px;', margin: '200px 50px 100px 650px' });
                        _this.panel1.header.closeButton;
                        _this.panel1.header.title = "Add Folder";
                    }
                    else {
                        _this.panel.close();
                        _this.panel1.close();
                    }
                    // Create the interface for the file manager
                    var mainFile = new fileManagerC_1.FileManagerController();
                    mainFile.fileManagercontrols(log.getToken(), mapApi, tfm, _this.panel, _this.panel1);
                }
            };
        });
    };
    ;
    return FileController;
}());
exports.FileController = FileController;
