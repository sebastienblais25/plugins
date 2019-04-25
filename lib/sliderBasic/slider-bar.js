"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var nouislider = require("nouislider");
require("nouislider/distribute/nouislider.css");
var domtoimage = require('dom-to-image');
var gifshot = require('gifshot');
var FileSaver = require('file-saver');
var rxjs_1 = require("rxjs");
/**
 * ...
 */
var SliderBar = /** @class */ (function () {
    function SliderBar(mapApi, config) {
        var _this = this;
        // array of images to export as Gif
        this._gifImages = [];
        this._mapApi = mapApi;
        this._slider = document.getElementById('nouislider');
        this._config = config;
        this._layer = this._config.layerRef; // TODO: do we need
        // set dynamic values used in accessor
        this._slider.delay = config.delay;
        this._slider.lock = config.lock;
        this._slider.loop = config.loop;
        this._slider.range = config.range;
        this._slider.export = config.export;
        this._playState = new rxjs_1.BehaviorSubject(false);
        // initialize the slider
        // TODO: check what is best range vs step.........
        var delta = Math.abs(config.limit.max - config.limit.min);
        var mapWidth = this._mapApi.fgpMapObj.width;
        nouislider.create(this._slider, {
            start: [this._slider.range.min, this._slider.range.max],
            connect: true,
            behaviour: 'drag-tap',
            tooltips: [{ to: function (value) { return _this.formatPips(value, _this._config.field.type, _this._config.language); }, from: Number },
                { to: function (value) { return _this.formatPips(value, _this._config.field.type, _this._config.language); }, from: Number }],
            range: this.setRanges(mapWidth, config.limit, delta),
            pips: {
                mode: 'range',
                density: (mapWidth > 800) ? 2 : 25,
                format: {
                    to: function (value) { return _this.formatPips(value, _this._config.field.type, _this._config.language); },
                    from: Number
                }
            }
        });
        // add handles to focus cycle
        document.getElementsByClassName('noUi-handle-lower')[0].setAttribute('tabindex', '-2');
        document.getElementsByClassName('noUi-handle-upper')[0].setAttribute('tabindex', '-2');
        // set the initial definition query
        this.setDefinitionQuery(this._slider.range);
        // trap the on change event when user use handles
        var that = this;
        this._slider.noUiSlider.on('set.one', function (values) {
            var ranges = values.map(Number);
            that._slider.range = { min: ranges[0], max: ranges[1] };
            that.setDefinitionQuery(that._slider.range);
            // update step from new range values
            if (!that._slider.lock) {
                that._config.step = that._slider.range.max - that._slider.range.min;
            }
        });
    }
    SliderBar.prototype.getPlayState = function () {
        return this._playState.asObservable();
    };
    SliderBar.prototype.setPlayState = function (newValue) {
        this._playState.next(newValue);
    };
    SliderBar.prototype.setRanges = function (width, limit, delta) {
        var range = {};
        range.min = limit.min;
        range.max = limit.max;
        range['50%'] = limit.min + delta / 2;
        if (width > 800) {
            range['25%'] = limit.min + delta / 4;
            range['75%'] = limit.min + (delta / 4) * 3;
        }
        return range;
    };
    SliderBar.prototype.formatPips = function (value, field, lang) {
        if (field === 'number') {
            value = Math.round(value * 100) / 100;
        }
        else if (field === 'date') {
            var date = new Date(value);
            if (lang === 'en-FR') {
                value = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
            }
            else {
                value = date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear();
            }
        }
        return value;
    };
    Object.defineProperty(SliderBar.prototype, "lock", {
        get: function () {
            return this._slider.lock;
        },
        set: function (lock) {
            this._slider.lock = lock;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SliderBar.prototype, "loop", {
        get: function () {
            return this._slider.loop;
        },
        set: function (loop) {
            this._slider.loop = loop;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SliderBar.prototype, "delay", {
        get: function () {
            return this._slider.delay;
        },
        set: function (delay) {
            this._slider.delay = delay;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SliderBar.prototype, "export", {
        get: function () {
            return this._slider.export;
        },
        set: function (exp) {
            this._slider.export = exp;
        },
        enumerable: true,
        configurable: true
    });
    SliderBar.prototype.play = function (play) {
        var _this = this;
        if (play) {
            this._gifImages = [];
            // set play state to observable to change the icon
            this.setPlayState(play);
            // start play
            this.playInstant(this._config.limit.max);
            this._playInterval = setInterval(function () { return _this.playInstant(_this._config.limit.max); }, this.delay);
        }
        else {
            this.pause();
        }
    };
    SliderBar.prototype.playInstant = function (limitmax) {
        var _this = this;
        // if export gif is selected, take a snapshot and use timeout to take it just before the next move
        // so definition query has finished
        if (this.export)
            setTimeout(function () { _this.takeSnapShot(false); }, this.delay - 500);
        if (this._slider.range.max !== limitmax) {
            this.step('up');
        }
        else if (this._slider.loop) {
            // slider is in loop mode, reset ranges and continue playing
            this._slider.range.min = this._config.limit.min;
            this._slider.range.max = this._slider.range.min + this._config.step;
            this._slider.noUiSlider.set([this._slider.range.min, this._slider.range.max]);
        }
        else {
            this.pause();
        }
    };
    SliderBar.prototype.takeSnapShot = function (stop) {
        var _this = this;
        // get map node + width and height
        var node = document.getElementsByClassName('rv-esri-map')[0];
        var width = node.offsetWidth;
        var height = node.offsetHeight;
        domtoimage.toPng(node, { bgcolor: 'white' }).then(function (dataUrl) {
            _this._gifImages.push(dataUrl);
            if (stop) {
                _this.export = false;
                gifshot.createGIF({
                    'images': _this._gifImages,
                    'interval': _this.delay,
                    'gifWidth': width,
                    'gifHeight': height
                }, function (obj) {
                    if (!obj.error) {
                        FileSaver.saveAs(_this.dataURItoBlob(obj.image), 'fgpv-slider-export.gif');
                    }
                });
            }
        }).catch(function (error) {
            console.error('Not able to save screen shot!', error);
        });
    };
    SliderBar.prototype.dataURItoBlob = function (dataURI) {
        // https://stackoverflow.com/questions/46405773/saving-base64-image-with-filesaver-js
        // convert base64 to raw binary data held in a string
        // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
        var byteString = atob(dataURI.split(',')[1]);
        // separate out the mime component
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
        // write the bytes of the string to an ArrayBuffer
        var ab = new ArrayBuffer(byteString.length);
        // create a view into the buffer
        var ia = new Uint8Array(ab);
        // set the bytes of the buffer to the correct values
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        // write the ArrayBuffer to a blob, and you're done
        var blob = new Blob([ab], { type: mimeString });
        return blob;
    };
    SliderBar.prototype.pause = function () {
        // if export gif is selected, take a snapshot
        if (this.export) {
            this.takeSnapShot(true);
        }
        clearInterval(this._playInterval);
        // set play state to observable to change the icon
        this.setPlayState(false);
    };
    SliderBar.prototype.refresh = function () {
        this._slider.noUiSlider.set([this._config.range.min, this._config.range.max]);
        this.setDefinitionQuery(this._config.range);
        this.pause();
    };
    SliderBar.prototype.step = function (direction) {
        // get handles values and set step
        var values = this._slider.noUiSlider.get().map(Number);
        var step = (direction === 'up') ? this._config.step : -this._config.step;
        // calculate range values then apply to slider
        var range = { min: this.lock ? values[0] : this.setLeftAnchor(values, direction, step), max: this.setRightAnchor(values, direction, step) };
        this._slider.noUiSlider.set([range.min, range.max]);
        // apply to layer
        this.setDefinitionQuery(range);
        this._slider.range = range;
        console.log("range: { min: " + range.min + ", max: " + range.max + " }, step: " + step);
    };
    SliderBar.prototype.setLeftAnchor = function (values, direction, step) {
        var value = 0;
        var limit = this._config.limit;
        if (direction === 'down') {
            // left anchor needs to be higher or equal to min limit (down = minus step)
            if (Math.floor(values[0] + step) < limit.min) {
                value = limit.min;
            }
            else {
                value = values[0] + step;
            }
        }
        else {
            // left anchor needs to be lower then max limit - step
            if (Math.ceil(values[0] + step) > limit.max - step) {
                value = limit.max - step;
            }
            else {
                value = values[0] + step;
            }
        }
        return parseFloat(value.toFixed(this._config.precision));
    };
    SliderBar.prototype.setRightAnchor = function (values, direction, step) {
        var value = 0;
        var limit = this._config.limit;
        if (direction === 'up') {
            // right anchor needs to be lower or equal to max limit
            if (Math.ceil(values[1] + step) > limit.max) {
                value = limit.max;
            }
            else {
                value = values[1] + step;
            }
        }
        else {
            // right anchor needs to be higher then min limit + step (down = minus step)
            if (Math.floor(values[1] + step) < limit.min - step) {
                value = limit.min - step;
            }
            else {
                value = values[1] + step;
            }
        }
        return parseFloat(value.toFixed(this._config.precision));
    };
    SliderBar.prototype.setDefinitionQuery = function (range) {
        var myLayer = this._mapApi.layers.getLayersById(this._config.id)[0];
        if (this._config.field.type === 'number') {
            myLayer.setFilterSql('rangeSliderNumberFilter', this._config.field.name + " > " + range.min + " AND " + this._config.field.name + " <= " + range.max);
        }
        else if (this._config.field.type === 'date') {
            var min = new Date(range.min);
            var max = new Date(range.max);
            var dateMin = min.getMonth() + 1 + "/" + min.getDate() + "/" + min.getFullYear();
            var dateMax = max.getMonth() + 1 + "/" + max.getDate() + "/" + max.getFullYear();
            myLayer.setFilterSql('rangeSliderDateFilter', this._config.field.name + " > DATE '" + dateMin + "' AND " + this._config.field.name + " <= DATE '" + dateMax + "'");
        }
    };
    return SliderBar;
}());
exports.SliderBar = SliderBar;
