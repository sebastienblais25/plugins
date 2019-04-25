import * as nouislider from 'nouislider';
import { LayersConfig, Range } from './layers-config';

/**
 * ...
 */
export class SliderBar {

    private _slider: any;

    // store one instance per map
    private static _instance: SliderBar;

    private constructor(LayersConfig: any) {
        this._slider = document.getElementById('nouislider');

        nouislider.create(this._slider,
            {
                start: [LayersConfig.range.min, LayersConfig.range.max],
                connect: true,
                range: {
                    'min': LayersConfig.limit.min,
                    //'25%': (LayersConfig.rangeValues.min / 4) * 3,
                    '50%': LayersConfig.limit.min - (LayersConfig.limit.max / 2),
                    //'75%': (LayersConfig.rangeValues.min / 4) * 3,
                    'max': LayersConfig.limit.max
                },
                pips: {
                    mode: 'range',
                    density: 5
                }
            });

        this._slider.lock = true;
        console.log(LayersConfig.rangeValues)
    }

    static getInstance(LayersConfig?: any): SliderBar {
        if (!SliderBar._instance && typeof LayersConfig !== 'undefined') {
            SliderBar._instance = new SliderBar(LayersConfig);
        }

        return SliderBar._instance;
    }

    set lock(lock: boolean) {
        this._slider.lock = lock;
        console.log(this._slider.lock);
    }

    get lock() {
        return this._slider.lock
    }

    step(direction: string) {
        console.log(direction);
        const layer = LayersConfig.getInstance();
        console.log(layer.rangeValues.min);

        // get handles values
        const values = this._slider.noUiSlider.get().map(Number);

        const range: Range = { min: values[0], max: 0 };
        range.max = (direction === 'up') ? values[1] + layer.step : values[1] - layer.step;

        this._slider.noUiSlider.set([range.min, range.max]);

        layer.rangeValues = range;
        layer.setDefinitionQuery();

        console.log(this._slider.noUiSlider.get());
    }
}

// export interface SliderBar {
//     lock: boolean
// }
