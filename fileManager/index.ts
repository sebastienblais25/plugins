import { FileManagerController } from './controller/fileManagerC';
import { FileMana } from './operation/fileMana';

export default class FileManager {
    /**
     * Initialize the plugins into the viewer
     * @param {*} api Ramp API
     * @memberof FileManager
     */
    init(api: any): void {
        // Set la variable api pour le plugin
        this.mapApi = api;
        // Set _RV
        this.config = this._RV.getConfig('plugins').fileManager;
        // Set la langue pour le plugin
        this.config.language = this._RV.getCurrentLang();
        // Set la config pour la geometry
        this.config.url = this._RV.getConfig('services').geometryUrl;
        // Création d'un button d'accès à partir du menu
        this.button = this.mapApi.mapI.addPluginButton(
            FileManager.prototype.translations[this._RV.getCurrentLang()].filem,
            this.onMenuItemClick()
        );
        // Ajoute un panel
        
    }
    /**
     * Add a button in the side to open the plugins and close this side menu
     * @returns 
     * @memberof FileManager
     */
    onMenuItemClick(): any {
        return () => {
            this.button.isActive = !this.button.isActive;
            // Alert(this.mapApi.layer);
            this._RV.toggleSideNav('close');
            // Open the panel
            this.addPanel();
        };
    }
    /**
     * Création du panel pour le plugins et ensuite ajoute le formulaire pou la connexion 
     * de l'utilisateur 
     * @memberof FileManager
     */
    addPanel(): void { 
        if (!this.panel) {
            // make sure both header and body have a digest cycle run on them
            this.panel = this.mapApi.panels.create('FileManager');
            //Size of the panel
            this.panel.element.css( {top: '0px;', margin: '100px 50px 100px 450px'} );
            //button in the header of the panel
            this.panel.header.toggleButton;
            this.panel.header.closeButton; 
        } else {
            this.panel.close();
        }
        let panel: any;
        let tfm: FileMana = new FileMana();
        tfm.setUrl(this.config);
        let mainFile: FileManagerController = new FileManagerController()
        mainFile.fileManagercontrols('hello',this.mapApi, tfm, this.panel, panel);
    }
    /**
     * Compile a html template to read to compile and replace all the variable inside the template
     * @param {*} template The html template to compile
     * @param {*} mapApi The API of the viewer to compile it(service angular)
     * @returns {JQuery<HTMLElement>}
     * @memberof FileManager
     */
    compileTemplate(template: string, mapApi: any): JQuery<HTMLElement> {
        let temp = $(template);
        mapApi.$compile(temp);
        return temp;
    }
};

// Interface pour avoir accès au element du viewer
export default interface FileManager {
    mapApi: any,
    _RV: any,
    config: any,
    button: any,
    translations: any,
    windowD: any,
    panel: any;
};

// Translate label
FileManager.prototype.translations = {
    'en-CA': {
        // Commun
        // file manager
        filem: 'File Explorer (Alpha)',
    },

    'fr-CA': {
        // Commun
        // file manager
        filem: 'Explorateur de fichier (Alpha)',
    }
};

// Ajout du plugins à l'application
(<any>window).fileManager = FileManager;
