"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const html_assets_1 = require("./html-assets");
class AreasOfInterest {
    preInit(pluginConfig) {
        this.config = pluginConfig;
        // standardize the configuration language titles for translation
        this.config.areas.forEach((area, i) => {
            Object.keys(area).forEach(key => {
                const matchResult = key.match(/title-(.*)/);
                if (matchResult) {
                    const translation = this.translations[matchResult[1]];
                    translation.areaTitles = translation.areaTitles ? translation.areaTitles : {};
                    translation.areaTitles[i] = area[key];
                    delete area[key];
                }
                else if (key === 'wkid') {
                    area.spatialReference = { wkid: area[key] };
                    delete area[key];
                }
            });
        });
    }
    init(api) {
        this.api = api;
        AreasOfInterest.instances[this.api.id] = this;
        const topElement = $('<ul class="rv-list rv-basemap-list"></ul>');
        this.config.areas.forEach((area, i) => {
            let areaHTML = this.config.noPicture ? html_assets_1.noPic : html_assets_1.hasPic;
            areaHTML = areaHTML.replace(/{areaIndex}/, i);
            areaHTML = areaHTML.replace(/{imgSrc}/, area.thumbnailUrl || html_assets_1.pinImg);
            topElement.append(areaHTML);
            const currBtn = topElement.find('button').last();
            currBtn.click(() => (this.api.setExtent(area)));
        });
        this.button = this.api.mapI.addPluginButton(AreasOfInterest.prototype.translations[this._RV.getCurrentLang()].title, this.onMenuItemClick());
        this.makePanel(topElement);
    }
    destroy() {
        this.panel = this.panel.destroy();
    }
    onMenuItemClick() {
        const openPanel = () => {
            this._RV.toggleSideNav('close');
            this.panel.open();
        };
        return () => {
            this.button.isActive ? this.panel.close() : openPanel();
        };
    }
    makePanel(bodyElement) {
        // panel is already made
        if (this.panel) {
            return;
        }
        this.panel = this.api.panels.create('area-of-interest');
        this.panel.element.css({
            width: '400px'
        });
        this.panel.element.addClass('mobile-fullscreen');
        if (!this.config.noPicture) {
            this.panel.body.css('padding', '0px');
        }
        this.panel.opening.subscribe(() => {
            this.button.isActive = true;
        });
        this.panel.closing.subscribe(() => {
            this.button.isActive = false;
        });
        let closeBtn = this.panel.header.closeButton;
        this.panel.header.title = 'plugins.areasOfInterest.title';
        this.panel.body = bodyElement;
    }
}
// A store of the instances of areasOfInterest, 1 per map
AreasOfInterest.instances = {};
AreasOfInterest.prototype.translations = {
    'en-CA': {
        title: 'Areas of Interest'
    },
    'fr-CA': {
        title: `Zones d'intérêt`
    }
};
window.areasOfInterest = AreasOfInterest;
