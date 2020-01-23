import { form } from './html-assets';
import {Info} from './info';
import { panel } from './panelManager';
import { resolve } from 'dns';


const FileSaver = require('file-saver');

export default class Testing{

    _panel:panel = new panel();

    //initiation
    init(api: any) {
        //set la variable api pour le plugin
        this.mapApi = api;
        //set _RV
        this.config = this._RV.getConfig('plugins').testing;
        //set la langue pour le plugin
        this.config.language = this._RV.getCurrentLang();
        //création d'un button d'accès à partir du menu
        this.button = this.mapApi.mapI.addPluginButton(
            Testing.prototype.translations[this._RV.getCurrentLang()].testbutton,
            this.onMenuItemClick()
        );
        
        //appel une fonction pour faire un alert lors d'un clic sur la map
        this.listenToAlert();
        
    }

    //add side menu item
    onMenuItemClick() {
        return () => {
            //this.button.isActive = !this.button.isActive;

            this._RV.toggleSideNav('close');
            this.addPanel();
            
        };
    }

    //add a panel with a form
    addPanel(){
        let name:string = 'planifiezZT'
        let hello = new Info('','','','','');
        //add panel
        this.panel = this._panel.createPanel(this.panel, this.mapApi,name,Testing.prototype.translations[this._RV.getCurrentLang()].testbutton);
        this.panel.body = hello.getFormPanifiez(hello.interactiveDropDownList());

        //add panel to this
        this.panel.open();

        hello.getInformation();
    }


    //alert when clicked
    listenToAlert(){
        this.mapApi.click.subscribe(clickEvent => this.clickHandler(clickEvent));
    }

    clickHandler(clickEvent) {
        // get current language
        const lang = this._RV.getCurrentLang();

        alert('You clicked on point ');
        //var blob = new Blob(["Hello, world!"], {type:"application/json"});
        //FileSaver.saveAs(blob, "hello world.json");
        //create a json and save the file in the download folder
        let output:any = {
            "env": (<HTMLInputElement>document.getElementById("env")).value,
            "theme": (<HTMLInputElement>document.getElementById("theme")).value,
            "id_lot": (<HTMLInputElement>document.getElementById("ZT")).value,
            "clip": "oui",
            "geom": (<HTMLInputElement>document.getElementById("geom")).value
        };

        let json:any = JSON.stringify(output)
        let blob = new Blob([json],{type:"application/json"});
        FileSaver.saveAs(blob,'export.json');


        //appel à l'API
        /*const promises = [];
        promises.push(
            new Promise(resolve =>{
              $.ajax({
                url: 'blahblah.ca',
                cache:false,
                data:json,
                dataType:'json',
                success: data=>resolve()
              });  
        })
        );
        Promise.all(promises).then(values => {
            alert('all good');
        });*/

    }
};

export default interface Testing{
    mapApi: any,
    _RV: any,
    config: any,
    button:any,
    translations: any,
    panel:any,
    buttonp:any ;
};

Testing.prototype.translations = {
    'en-CA': {
        testbutton: 'Planning Work Place',
    },

    'fr-CA': {
        testbutton: 'Planifiez zone de travail',   
    }
};


/*function submitForm(){
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
}*/

(<any>window).testing = Testing;
