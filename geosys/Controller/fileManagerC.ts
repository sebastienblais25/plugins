import { User } from '../user';
import { FileManagerController } from '../../fileManager/fileManagerC';
import { FileMana } from '../../fileManager/fileMana';
import { urlFolderAction, urlFileAction, urlListFile } from '../../fileManager/url';


export class FileController {

    constructor(){}
    /**
     * Create the first panel for the with the root 
     * @param {User} log for the token and other useful tools
     * @param {*} mapApi The object of the API
     * @param {FileMana} tfm the object File Manager to keep where you are in a repository
     * @memberof FileManagerController
     */
    fileManagercontrols(log: User, mapApi: any): void {
        mapApi.agControllerRegister('FileManagerCtrl', function() {
            let panel:any;
            let tfm: FileMana = new FileMana();
            tfm.setUrl('hello', 'http://127.0.0.1:4010/', urlListFile, urlFolderAction, urlFileAction);
            //permet d'afficher ou chacher le formulaire en cliquant sur le titre
            this.OpenFileManager = () => {
                if (log.getEnvironnementSel() !== '') {
                    if (!panel) {
                        // make sure both header and body have a digest cycle run on them
                        panel = mapApi.panels.create('FileManager');
                        //Size of the panel
                        panel.element.css( {top: '0px;', margin: '100px 50px 100px 450px'} );
                        //button in the header of the panel
                        panel.header.toggleButton;
                        panel.header.closeButton; 
                    } else {
                        panel.close();
                    }
                    let mainFile: FileManagerController = new FileManagerController()
                    mainFile.fileManagercontrols(log.getToken(), mapApi, tfm, panel);
                }
            };
        });
    };
}