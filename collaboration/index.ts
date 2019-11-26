import { PanelManager } from './panel-manager';

export default class Collaboration {
    private _style:string = '';

    init(mapApi: any) {
        this.mapApi = mapApi;

        // get collaboration config
        this.config = this._RV.getConfig('plugins').collaboration;
        this.config.language = this._RV.getCurrentLang();
        this.config.url = this._RV.getConfig('services').geometryUrl;

        // create mapnav panel
        this.panelManager = new PanelManager(mapApi, this.config);

        // create side menu button to toggle toolbar
        this.button = this.mapApi.mapI.addPluginButton(
            Collaboration.prototype.translations[this._RV.getCurrentLang()].draw.menu,
            this.onMenuItemClick()
        );
        this.button.isActive = true;
    }

    onMenuItemClick() {
        return () => {
            this.button.isActive = !this.button.isActive;
            (<any>document).getElementsByClassName('rv-mapnav-draw-content')[0].style.display = this.button.isActive ? 'block' : 'none';
        };
    }
}

export default interface Collaboration {
    mapApi: any;
    _RV: any;
    config: any;
    translations: any;
    panelManager: PanelManager;
    button: any;
}

Collaboration.prototype.translations = {
    'en-CA': {
        draw: {
            menu: 'Draw Toolbar',
            picker: 'Select color',
            point: 'Draw point',
            line: 'Draw line',
            polygon: 'Draw polygon',
            measure: 'Show/Hide measures',
            extent: 'Erase selected graphics',
            write: 'Save to download folder',
            read: 'Upload graphics file'
        }
    },
    'fr-CA': {
        draw: {
            menu: 'Barre de dessin',
            picker: 'Sélectionner la couleur',
            point: 'Dessiner point',
            line: 'Dessiner ligne',
            polygon: 'Dessiner polygon',
            measure: 'Afficher/Cacher les mesures',
            extent: 'Effacer les graphiques sélectionnés',
            write: 'Sauvegarder dans le répertoire téléchargement',
            read: 'Charger le fichier de graphiques'
        }
    }
};

(<any>window).collaboration = Collaboration;