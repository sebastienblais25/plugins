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
    onMenuItemClick(): () => void;
    /**
     *Création du panel pour le plugins et ensuite ajoute le formulaire pou la connexion
     * de l'utilisateur
     * @memberof Geosys
     */
    addLoginPanel(): void;
    /**
     * first controller, the one function is the submit button to do a connexion call to the API and
     * return all the information for the user and stored in the usr class.
     * @param {*} panel the panel from the viewer
     * @param {*} mapApi the API from the viewer and angular
     * @param {*} config the config of the viewer(the other file in samples)
     * @memberof Geosys
     */
    connexionControls(panel: any, mapApi: any, config: any): void;
    /**
     * Compile a html template to read to compil and replace all the variable inside the template
     * @param {*} template the html template to compile
     * @param {*} mapApi the API of the viewer to compile it(service angular)
     * @returns {JQuery<HTMLElement>}
     * @memberof Geosys
     */
    compileTemplate(template: any, mapApi: any): JQuery<HTMLElement>;
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
