import { take } from 'rxjs/internal/operators/take';
import { SliderBar } from './slider-bar';

import { LayerConfig } from './layer-config';
/**
 * ...
 */
export class LayersConfig {
    range: Range;
    limit: Range;

    private _config: [];

    private _layers = [];
    private _activeLayer: Layer;

    // store one instance per map
    private static _instance: LayersConfig;

    private constructor(mapApi: any, layersConfig: []) {
       this.mapApi = mapApi;
       this.mapApi.layersObj.layerAdded.subscribe((layer: any) => this.addLayer(layer));

       this._config = layersConfig;
    }

    static getInstance(mapApi?: any, layersConfig?: []): LayersConfig {
        if (!LayersConfig._instance) {
            LayersConfig._instance = new LayersConfig(mapApi, layersConfig);
        }
    
        return LayersConfig._instance;
    }

    addLayer(layer: any): void {

        // get configuration and if it exist, get the attributes
        const config = this.getConfiguration(layer.id);
        if (typeof config.id !== 'undefined') {
            const attrs = layer.getAttributes();
            
            if (attrs.length === 0) {
                // make sure all attributes are added before creating the layer
                this.mapApi.layers.attributesAdded.pipe(take(1)).subscribe(attrs => {
                    if (attrs.attributes.length > 0) {
                        
                        layer.attributes = attrs;
                        this._layers.push(new LayerConfig(layer, config));

                        // initialiaze slider bar with active layer
                        SliderBar.getInstance(this._layers[0]);
                    }
                });
            }
        }
    }

    getConfiguration(id: string): Layer {
        const layer: Layer = {} as any;

        // loop trought array of layers to find if there is a configuration
        for (let layerConfig of this._config as Layer[]) {
            if (layerConfig.id === id) {
                layer.id = layerConfig.id;
                layer.field = layerConfig.field;

                if ('interval' in layerConfig) {
                    layer.interval = layerConfig.interval;
                } else { layer.interval = 10; }

                if ('range' in layerConfig) {
                    layer.range = layerConfig.range;
                } else { layer.range = { min: null, max: null }; }

                if ('limit' in layerConfig) {
                    layer.limit = layerConfig.limit;
                } else { layer.limit = { min: null, max: null }; }
            }
        }

        return layer;
    }

    get rangeValues(): Range {
        return this._activeLayer.range;
    }

    set rangeValues(range: Range) {
        this._activeLayer.range = range;
    }

    
    setDefinitionQuery() {
        const myLayer = this.mapApi.layers.getLayersById(this._activeLayer.id)[0];
        const myProxy = myLayer._layerProxy;  // cheating!
        myProxy.filter.setSql('myUniqueAppCode', `${this._activeLayer.field} > ${this._activeLayer.range.min} AND ${this._activeLayer.field} <= ${this._activeLayer.range.max}`);
    }

    get layer(): Layer {
        return this._activeLayer;
    }

    get step(): number {
        return this._activeLayer.step;
    }

    // set range(field: string) {
    //     console.log('range');
    // }

    set activeLayer(id: string) {

    }


}

interface Layer {
    id: string,
    field: string,
    fields: [],
    limit: Range,
    range: Range,
    interval: number,
    step: number
}

export interface Range {
    min: number,
    max: number
}

export interface LayersConfig {
    mapApi: any
}
