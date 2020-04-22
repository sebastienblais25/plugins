export default class FileManager {
    /**
     * Initialize the plugins into the viewer
     * @param {*} api Ramp API
     * @memberof FileManager
     */
    init(api: any): void;
    /**
     * Add a button in the side to open the plugins and close this side menu
     * @returns
     * @memberof FileManager
     */
    onMenuItemClick(): any;
    /**
     * Création du panel pour le plugins et ensuite ajoute le formulaire pou la connexion
     * de l'utilisateur
     * @memberof FileManager
     */
    addPanel(): void;
    /**
     * Compile a html template to read to compile and replace all the variable inside the template
     * @param {*} template The html template to compile
     * @param {*} mapApi The API of the viewer to compile it(service angular)
     * @returns {JQuery<HTMLElement>}
     * @memberof FileManager
     */
    compileTemplate(template: string, mapApi: any): JQuery<HTMLElement>;
}
export default interface FileManager {
    mapApi: any;
    _RV: any;
    config: any;
    button: any;
    translations: any;
    windowD: any;
    panel: any;
}
