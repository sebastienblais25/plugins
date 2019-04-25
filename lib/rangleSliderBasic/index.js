"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RangeSliderBasic = /** @class */ (function () {
    function RangeSliderBasic() {
    }
    RangeSliderBasic.prototype.init = function (mapApi) {
        this.mapApi = mapApi;
    };
    return RangeSliderBasic;
}());
exports.default = RangeSliderBasic;
// TableBuilder.prototype.tableOptions = {
//     enableSorting: true,
//     floatingFilter: true,
//     autoSizePadding: 75,
//     suppressColumnVirtualisation: true,
//     ensureDomOrder: true,
//     defaultColDef: {
//         width: 100
//     }
// };
// TableBuilder.prototype.id = 'fancyTable';
// TableBuilder.prototype._name = 'enhancedTable';
RangeSliderBasic.prototype.translations = {
    'en-CA': {
        search: {
            placeholder: 'Search table'
        },
        table: {
            filter: {
                clear: 'Clear filters',
                apply: 'Apply filters to map'
            },
            hideColumns: 'Hide columns'
        },
        menu: {
            split: 'Split View',
            max: 'Maximize',
            print: 'Print',
            export: 'Export',
            filter: {
                extent: 'Filter by extent',
                show: 'Show filters'
            }
        },
        detailsAndZoom: {
            details: 'Details',
            zoom: 'Zoom To Feature'
        },
        columnFilters: {
            selector: 'selection',
            date: {
                min: 'date min',
                max: 'date max'
            },
            text: 'text'
        }
    },
    'fr-CA': {
        search: {
            placeholder: 'Texte à rechercher'
        },
        table: {
            filter: {
                clear: 'Effacer les filtres',
                apply: 'Appliquer des filtres à la carte' // TODO: Add official French translation
            },
            hideColumns: 'Masquer les colonnes' // TODO: Add Official French translation
        },
        menu: {
            split: 'Diviser la vue',
            max: 'Agrandir',
            print: 'Imprimer',
            export: 'Exporter',
            filter: {
                extent: 'Filtrer par étendue',
                show: 'Afficher les filtres'
            }
        },
        detailsAndZoom: {
            details: 'Détails',
            zoom: "Zoom à l'élément"
        },
        columnFilters: {
            selector: 'sélection',
            date: {
                min: 'date min',
                max: 'date max'
            },
            text: 'texte'
        }
    }
};
window.rangeSliderBasic = RangeSliderBasic;
