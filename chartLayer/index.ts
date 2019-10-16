// decided to first use chartjs because of is simplicity. TODO: look for D3 https://www.slant.co/versus/10578/10577/~chart-js_vs_d3-js
// https://en.wikipedia.org/wiki/Comparison_of_JavaScript_charting_libraries
import { ChartLoader } from './chart-loader';
import {
    CHART_TEMPLATE
} from './templates';

export default class ChartLayer {
    // parser(data, lang) {
    //     console.log('YOUPI!!! ' + data);
    //     return { Country: 'Canada', 'Name of Pipeline': 'Parser output' };
    // }

    // template(element) {
    //     const el = `<h2> {{self.layer['Name of Pipeline']}}</h2>
    //     </br>
    //     <a href="#">Here is a link</a>
    //     <p>Text too</p>
    //     <h3>Country from details info</h3>
    //     <p>{{self.layer['Country']}}</p>

    //     <img src="./about/indexOne/images/canada.png"></img>

    //     <p>{{ self.lang }}</p>`;
    //     element.insertAdjacentHTML( 'beforeend', el );
    // }

    init(mapApi: any) {
        this.mapApi = mapApi;

        // create panel
        this.panel = this.mapApi.panels.create('chart');
        this.panel.element.css(ChartLayer.prototype.panelOptions);
        this.panel.body = CHART_TEMPLATE;
        this.panel.header.closeButton;

        // TODO: remove
        this.mapApi.panels.details.openingSubject.subscribe((value) => {
            value.listInit.forEach(function(a) {
                console.log(a)
            });

            value.populateList.forEach(function(a) {
                console.log(a)
            });
        })

        // get chart config and add language
        this.config = this._RV.getConfig('plugins').chart;
        this.config.language = this._RV.getCurrentLang();
        
        // subscribe to click event when user click on data to trigger chart creation
        this.mapApi.click.subscribe(pt => {
            this.panel.close();
            pt.features.subscribe(feat => {
                new ChartLoader(this.mapApi, this.config, feat);
            });
        });
    }
}

export default interface ChartLayer {
    mapApi: any,
    _RV: any,
    panel: any,
    config: any,
    panelOptions: any
}

ChartLayer.prototype.panelOptions = {
    'margin-top': '60px',
    'margin-bottom': '60px',
    'margin-right': '60px',
    'margin-left': '420px'
};

(<any>window).chartLayer = ChartLayer;