"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
* ...
*/
var LayerConfig = /** @class */ (function () {
    function LayerConfig(layer, config) {
        // check feature type and config esriFeature and esriDynamic
        if (LayerConfig.layerType.indexOf(layer._layerType) > -1) {
            // set fields and attribute
            if (layer._layerType === 'esriDynamic') {
                var that_1 = this;
                layer._viewerLayer._featClasses[0]._layerPackage.layerData.then(function (val) { that_1.setFields(val.fields, config.field); });
            }
            else {
                this.setFields(layer.esriLayer.fields, config.field);
            }
            this.setAttributes();
        }
        else {
            // TODO work on wms and wms-t
        }
    }
    LayerConfig.prototype.setAttributes = function () {
        var r = { min: 0, max: 100 };
        this.range = r;
        var l = { min: 0, max: 100 };
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
    };
    LayerConfig.prototype.setFields = function (fields, fieldName) {
        var myFields = { fields: [], active: null };
        var field = {};
        for (var _i = 0, fields_1 = fields; _i < fields_1.length; _i++) {
            field = fields_1[_i];
            if (LayerConfig.fieldType.ESRI_NUMBER.indexOf(field.type) > -1) {
                myFields.fields.push({ name: field.name, type: 'number' });
            }
            else if (LayerConfig.fieldType.ESRI_DATE.indexOf(field.type) > -1) {
                myFields.fields.push({ name: field.name, type: 'date' });
            }
        }
        // set the layer fields and active field if not set
        this.fields = myFields;
        this.setActiveField(fieldName);
    };
    Object.defineProperty(LayerConfig.prototype, "range", {
        get: function () {
            return this._range;
        },
        set: function (range) {
            this._range = range;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LayerConfig.prototype, "limit", {
        get: function () {
            return this._limit;
        },
        set: function (limit) {
            this._limit = limit;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LayerConfig.prototype, "step", {
        get: function () {
            return this.step;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LayerConfig.prototype, "id", {
        get: function () {
            return this.id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LayerConfig.prototype, "type", {
        get: function () {
            return this.type;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LayerConfig.prototype, "activeField", {
        get: function () {
            return this.fields.active;
        },
        enumerable: true,
        configurable: true
    });
    LayerConfig.prototype.setActiveField = function (name) {
        var field = this.fields.fields.filter(function (val) {
            return (val.name.toUpperCase() === name.toUpperCase());
        });
        this.fields.active = field !== [] ? this.fields.fields[0] : field;
    };
    LayerConfig.layerType = ['esriFeature', 'esriDynamic'];
    LayerConfig.fieldType = {
        ESRI_NUMBER: ['esriFieldTypeDouble', 'esriFieldTypeInteger'],
        ESRI_DATE: ['esriFieldTypeDate']
    };
    return LayerConfig;
}());
exports.LayerConfig = LayerConfig;
