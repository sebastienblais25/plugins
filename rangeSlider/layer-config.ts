import { take } from 'rxjs/internal/operators/take';

/*
* ...
*/
export class LayerConfig {
    static layerType = ['esriFeature', 'esriDynamic'];

    static fieldType = {
        ESRI_NUMBER: ['esriFieldTypeDouble', 'esriFieldTypeInteger'],
        ESRI_DATE: ['esriFieldTypeDate']
    };

    private _range: Range;
    private _limit: Range;

    constructor(layer: any, config: any) {

        // check feature type and config esriFeature and esriDynamic
        if (LayerConfig.layerType.indexOf(layer._layerType) > -1) {

            // set fields and attribute
            if (layer._layerType === 'esriDynamic') {
                const that = this;
                layer._viewerLayer._featClasses[0]._layerPackage.layerData.then(val => { (<any>that).setFields(val.fields, config.field); });
            } else {
                this.setFields(layer.esriLayer.fields, config.field);
            }

            this.setAttributes();
        } else {
            // TODO work on wms and wms-t
        }
       
        
    }

    setAttributes(): void {

       const r: Range = { min: 0, max: 100 };
       this.range = r;

       const l: Range = { min: 0, max: 100 };
       this.limit = l;

       //this.step = 70;

        // this.limit = { min: 0, max: 0 };
        // this.id = 'tets';
        
        //  // get attributes value for specified field
        //  const values: number[] = [];
        //  for (let row of attrs.attributes) {
        //      values.push(row[layerConfig.field])
        //  }

        //  // set limit and range if not set from configuration
        //  const limits: Range = { min: Math.min.apply(null, values), max: Math.max.apply(null, values) };
        //  console.log(layerConfig.id + ' ' + layer.id)
        //  if (layerConfig.limit.min === null) { layerConfig.limit = limits; }
        //  if (layerConfig.range.min === null) { layerConfig.range = limits; }

        //  // set step
        //  layerConfig.step = (layerConfig.limit.max - layerConfig.limit.min) / layerConfig.interval;

        //  // add configuration to array of layers
        //  this._layers.push(layerConfig);
        //  this._activeLayer = layerConfig;

        //  console.log('config de marde')
        //  console.log(this._layers[0])

        //  // initialiaze slider bar with active layer
        //  SliderBar.getInstance(this._activeLayer);

        // const attrs = layer.getAttributes();



        // const attrs = layer.getAttributes();
        // let attributeHeaders = layer.attributeHeaders;
        // console.log(layer.esriLayer.fields);
        // if (attrs.length === 0) {
        //     // make sure all attributes are added before creating the table (otherwise table displays without SVGs)
        //     this.mapApi.layers.attributesAdded.pipe(take(1)).subscribe(attrs => {
        //         if (attrs.attributes.length > 0) {
        //             // get configuration
        //             const layerConfig: Layer = this.getConfiguration(layer.id);

        //             // get attributes value for specified field
        //             const values: number[] = [];
        //             for (let row of attrs.attributes) {
        //                 values.push(row[layerConfig.field])
        //             }

        //             // set limit and range if not set from configuration
        //             const limits: Range = { min: Math.min.apply(null, values), max: Math.max.apply(null, values) };
        //             console.log(layerConfig.id + ' ' + layer.id)
        //             if (layerConfig.limit.min === null) { layerConfig.limit = limits; }
        //             if (layerConfig.range.min === null) { layerConfig.range = limits; }

        //             // set step
        //             layerConfig.step = (layerConfig.limit.max - layerConfig.limit.min) / layerConfig.interval;

        //             // add configuration to array of layers
        //             this._layers.push(layerConfig);
        //             this._activeLayer = layerConfig;

        //             console.log('config de marde')
        //             console.log(this._layers[0])

        //             // initialiaze slider bar with active layer
        //             SliderBar.getInstance(this._activeLayer);
        //         }
        //     });
        // }
    }

    setFields(fields: [], fieldName: string): void {
        const myFields: Fields = { fields: [], active: null };

        let field = {} as any;
        for (field of fields) {
            if (LayerConfig.fieldType.ESRI_NUMBER.indexOf(field.type) > -1) {
                myFields.fields.push({ name: field.name, type: 'number' });
            } else if (LayerConfig.fieldType.ESRI_DATE.indexOf(field.type) > -1) {
                myFields.fields.push({ name: field.name, type: 'date' });
            }
        }

        // set the layer fields and active field if not set
        this.fields = myFields;
        this.setActiveField(fieldName);
    }

    set range(range: Range) {
        this._range = range;
    }

    get range(): Range {
        return this._range;
    }

    set limit(limit: Range) {
        this._limit = limit;
    }

    get limit(): Range {
        return this._limit;
    }

    get step(): number {
        return this.step;
    }

    get id(): string {
        return this.id;
    }

    get type(): 'esriFeature' | 'esriDynamic' | 'wms' | 'wms-t' {
        return this.type;
    }

    get activeField(): Field {
        return this.fields.active;
    }

    setActiveField(name: string) {
        let field: any = this.fields.fields.filter((val) => {
            return (val.name.toUpperCase() === name.toUpperCase());
        });

        this.fields.active = field !== [] ? this.fields.fields[0] : field;
    }
}

interface Field {
    name: string;
    type: 'number' | 'date';
}

interface Fields {
    fields: Field[];
    active: Field
}

export interface Range {
    min: number,
    max: number
}

export interface LayerConfig {
    rangeL: Range;
    limitL: Range;
    stepL: number;
    fields: Fields;
    idL: string;
    type: 'esriFeature' | 'esriDynamic' | 'wms' | 'wms-t';
    defQuery: string;
}