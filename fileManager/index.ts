
export default class Geosys {
    /**
     * Initialize the plugins into the viewer
     * @param {*} api Ramp API
     * @memberof Geosys
     */
    init(api: any): void {
        // Set la variable api pour le plugin
        this.mapApi = api;
        // Set _RV
        this.config = this._RV.getConfig('plugins').geosys;
        // Set la langue pour le plugin
        this.config.language = this._RV.getCurrentLang();
        // Set la config pour la geometry
        this.config.url = this._RV.getConfig('services').geometryUrl;
        // Création d'un button d'accès à partir du menu
        this.button = this.mapApi.mapI.addPluginButton(
            Geosys.prototype.translations[this._RV.getCurrentLang()].testbutton,
            this.onMenuItemClick()
        );
        // Ajoute un panel
        this.addLoginPanel();
    }
    /**
     * Add a button in the side to open the plugins and close this side menu
     * @returns 
     * @memberof Geosys
     */
    onMenuItemClick(): any {
        return () => {
            this.button.isActive = !this.button.isActive;
            // Alert(this.mapApi.layer);
            this._RV.toggleSideNav('close');
            // Open the panel
            this.panel.open();  
        };
    }
    /**
     * Création du panel pour le plugins et ensuite ajoute le formulaire pou la connexion 
     * de l'utilisateur 
     * @memberof Geosys
     */
    addLoginPanel(): void {
        
    }
    /**
     * Compile a html template to read to compile and replace all the variable inside the template
     * @param {*} template The html template to compile
     * @param {*} mapApi The API of the viewer to compile it(service angular)
     * @returns {JQuery<HTMLElement>}
     * @memberof Geosys
     */
    compileTemplate(template: string, mapApi: any): JQuery<HTMLElement> {
        let temp = $(template);
        mapApi.$compile(temp);
        return temp;
    }
};

// Interface pour avoir accès au element du viewer
export default interface Geosys {
    mapApi: any,
    _RV: any,
    config: any,
    button: any,
    translations: any,
    windowD: any,
    panel: any;
};

// Translate label
Geosys.prototype.translations = {
    'en-CA': {
        // Commun
        // file manager
        filem: 'File manager (Alpha)',
        
    },

    'fr-CA': {
        // Commun
        // file manager
        filem: 'Explorateur de fichier (Alpha)',
    }
};
// Ajout du plugins à l'application
(<any>window).geosys = Geosys;
