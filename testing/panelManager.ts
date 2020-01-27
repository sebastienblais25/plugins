const FileSaver = require('file-saver'); // le import

export class panelMod{
    ispanelshowing: boolean;
    _panel:any;
    _panelname:string;
    _panelTitle:string;
    _panelBottom:string;
    _panelWidth:string;


    createPanel(panel:any,mapApi:any,panelname?:string, paneltitle?:string, panelBottom:string = '0em',panelwidth:string = '400px'):any{
        this._panelname = panelname;
        this._panelBottom = panelBottom;
        this._panelTitle = paneltitle;
        this._panelWidth = panelwidth;

        if (!panel) {
            // make sure both header and body have a digest cycle run on them
            panel =mapApi.panels.create(this._panelname);

            panel.element.css({
                bottom: this._panelBottom,
                width: this._panelWidth
            });
            panel.element.addClass('mobile-fullscreen');
            let closeBtn = panel.header.closeButton;
            panel.header.title = paneltitle;
        } else {
            panel.close();
        }
        return panel;
    }

   //add method for the body of the panel

   //add method for title

   //add method for the submit button
   //si le button est pas en Angular
   submitForm(_RV:any):void{
    // get current language
    const lang = _RV.getCurrentLang();
   
   //To Change
    $("#submit").click(function() {
        
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


        // pour appel à l'API
        /*const promises = [];
        promises.push(
            new Promise(resolve =>{
            $.ajax({
                url: '',
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

    });
};

}

export interface PanelManager {
    panel: any;
    mapApi: any;
    active: object;
}