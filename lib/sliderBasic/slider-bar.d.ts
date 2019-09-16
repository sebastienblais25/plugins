import 'nouislider/distribute/nouislider.css';
import { Observable } from 'rxjs';
import { Range } from './index';
/**
 * ...
 */
export declare class SliderBar {
    private _slider;
    private _mapApi;
    private _layer;
    private _config;
    private _playInterval;
    private _playState;
    getPlayState(): Observable<boolean>;
    private setPlayState;
    private _gifImages;
    constructor(mapApi: any, config: any);
    setRanges(width: number, limit: any, delta: number): any;
    formatPips(value: any, field: string, lang: string): any;
    lock: boolean;
    loop: boolean;
    delay: number;
    export: boolean;
    play(play: boolean): void;
    playInstant(limitmax: number): void;
    takeSnapShot(stop: boolean): void;
    dataURItoBlob(dataURI: any): Blob;
    pause(): void;
    refresh(): void;
    step(direction: string): void;
    setLeftAnchor(values: number, direction: string, step: number): number;
    setRightAnchor(values: number, direction: string, step: number): number;
    setDefinitionQuery(range: Range): void;
    getDate(range: Range): string[];
}
