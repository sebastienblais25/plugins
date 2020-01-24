

export class panel{
    ispanelshowing: boolean;


    createPanel(panel:any,mapApi:any,panelname?:string, paneltitle?:string):any{
        if (!panel) {
            // make sure both header and body have a digest cycle run on them
            panel =mapApi.panels.create(panelname);

            panel.element.css({
                bottom: '0em',
                width: '400px'
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
}

export interface PanelManager {
    panel: any;
    mapApi: any;
    active: object;
}