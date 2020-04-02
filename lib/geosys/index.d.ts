export default class Geosys {
    /**
     * Initialize the plugins into the viewer
     * @param {*} api Ramp API
     * @memberof Geosys
     */
    init(api: any): void;
    /**
     * Add a button in the side to open the plugins and close this side menu
     * @returns
     * @memberof Geosys
     */
    onMenuItemClick(): any;
    /**
     * Création du panel pour le plugins et ensuite ajoute le formulaire pou la connexion
     * de l'utilisateur
     * @memberof Geosys
     */
    addLoginPanel(): void;
    /**
     * First controller, the one function is the submit button to do a connexion call to the API and
     * receive from API all the information for the user and stored in the usr class.
     * @param {*} panel The panel from the viewer
     * @param {*} mapApi The API from the viewer and angular
     * @param {*} config The config of the viewer(the other file in samples)
     * @memberof Geosys
     */
    connexionControls(panel: any, mapApi: any, config: any): void;
    /**
     * Compile a html template to read to compile and replace all the variable inside the template
     * @param {*} template The html template to compile
     * @param {*} mapApi The API of the viewer to compile it(service angular)
     * @returns {JQuery<HTMLElement>}
     * @memberof Geosys
     */
    compileTemplate(template: string, mapApi: any): JQuery<HTMLElement>;
}
export default interface Geosys {
    mapApi: any;
    _RV: any;
    config: any;
    button: any;
    translations: any;
    windowD: any;
    panel: any;
}
