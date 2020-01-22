import { form } from './html-assets';

export default class Testing{

    showpanel:boolean = false;

    //initiation
    init(api: any) {
        //set la variable api pour le plugin
        this.mapApi = api;

        this.config = this._RV.getConfig('plugins').test;
        //set la langue pour le plugin
        //this.config.language = this._RV.getCurrentLang();

        //création d'un button
        this.button = this.mapApi.mapI.addPluginButton(
            Testing.prototype.translations[/*this._RV.getCurrentLang()*/'en-CA'].testbutton,
            this.onMenuItemClick()
        );
        
        //code from coord-info
         // check to see if this init is due to projection change or language switch
         /*const activeNode = this.mapApi.mapDiv[0].getAttributeNode('coord-info-active');
         if (activeNode !== null) {
             this.mapApi.layers.identifyMode = 'none';
             // if coordinate info was active, turn it on again
             if (this.panel !== undefined) {
                 // destroy old panel so that new one gets created
                 this.panel.close({ destroy: true });
                 this.panel = undefined;
             }
         }*/

        this.listenToAlert();
    }

    //add side menu item
    onMenuItemClick() {
        return () => {
            this.button.isActive = !this.button.isActive;
            this._RV.toggleSideNav('close');
            //(<any>document).getElementsByClassName('rv-mapnav-draw-content')[0].style.display = this.button.isActive ? 'block' : 'none';


            // show the panel only when the button is checked
            if (this.showpanel === false){
                this.showpanel = true;
                //add a panel to the viewer
                this.createPanel();
            }else{
                this.showpanel = false;
            }
            
        };
    }

    //add a panel with a form
    createPanel(){
        if (!this.panel) {
            // make sure both header and body have a digest cycle run on them
            this.panel = this.mapApi.panels.create('Test');

            this.panel.element.css({
                bottom: '0em',
                width: '400px'
            });
            this.panel.element.addClass('mobile-fullscreen');
            let closeBtn = this.panel.header.closeButton;
            this.panel.header.title = 'test';
        } else {
            this.panel.close();
        }
        this.panel.body = form;

        this.panel.open();
    }


    //alert when clicked
    listenToAlert(){
        /*this.mapApi.click.subscribe(function(pointObject:any){

            alert('You clicked on point ' + pointObject.X + " "+ pointObject.Y);
        });*/
        this.mapApi.click.subscribe(clickEvent => this.clickHandler(clickEvent));
    }

    clickHandler(clickEvent) {
        // get current language
        const lang = this._RV.getCurrentLang();

        // get point in lat/long
        let pt = clickEvent.xy; //this._RV.projectGeometry(clickEvent.mapPoint, 4326);
        pt.spatialReference = 4326;
        alert('You clicked on point ' + pt.X + " "+ pt.Y);
    }
};

export default interface Testing{
    mapApi: any,
    _RV: any,
    config: any,
    button:any,
    pointObject :any,
    translations: any,
    panel:any;
};

Testing.prototype.translations = {
    'en-CA': {
        testbutton: 'Testing',
    },

    'fr-CA': {
        testbutton: 'testing',   
    }
};


function submitForm(){
    $(document).ready(function(){
        // click on button submit
        $("#submit").on('click', function(){
            // send ajax
            $.ajax({
                url: 'http://localhost:6001/testing/sample/', // url where to submit the request
                type : "POST", // type of action POST || GET
                dataType : 'json', // data type
                data : $("#form").serialize(), // post data || get data
                success : function(result) {
                    // you can see the result from the console
                    // tab of the developer tools
                    console.log(result);
                },
                error: function(xhr, resp, text) {
                    console.log(xhr, resp, text);
                }
            })
        });
    });
}

(<any>window).testing = Testing;
