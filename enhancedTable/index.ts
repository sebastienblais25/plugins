import { GridOptions, GridApi } from 'ag-grid-community';
import { take } from 'rxjs/internal/operators/take';
import { PanelManager } from './panel-manager';
import { DETAILS_TEMPLATE, ZOOM_TEMPLATE } from './templates';
import { ConfigManager, ColumnConfigManager } from './config-manager';
import { setUpDateFilter, setUpNumberFilter, setUpTextFilter, setUpSelectorFilter } from './custom-floating-filters';
import { CustomHeader } from './custom-header';
import { PanelStateManager } from './panel-state-manager';
import { PanelLoader } from './panel-loader';

const NUMBER_TYPES = ['esriFieldTypeOID', 'esriFieldTypeDouble', 'esriFieldTypeInteger'];
const DATE_TYPE = 'esriFieldTypeDate';
const TEXT_TYPE = 'esriFieldTypeString';

export default class TableBuilder {
    feature = 'table';
    attributeHeaders: any;

    init(mapApi: any) {
        this.mapApi = mapApi;

        this.panel = new PanelManager(mapApi);
        this.panel.reload = this.reloadTable.bind(this);

        this.mapApi.layers.reload.subscribe((baseLayer: any, interval: boolean) => {
            if (!interval && baseLayer === this.panel.currentTableLayer) {
                this.reloadTable(baseLayer);
            }
        });

        // toggle the enhancedTable if toggleDataTable is called from Legend API
        this.mapApi.ui.configLegend.dataTableToggled.subscribe(legendBlock => {
            if (this.panel.panelStateManager !== undefined) {
                // switch state of whether the table is open or not
                this.panel.panelStateManager.isOpen = !this.panel.panelStateManager.isOpen;
            }
            if (
                this.panel.panelStateManager === undefined ||
                this.panel.panelStateManager.isOpen === true ||
                legendBlock !== this.panel.panelStateManager.legendBlock
            ) {
                // if table has never been created, was closed until now, or you are opening a different table
                // go through loading + opening steps
                if (this.panel.panelStateManager !== undefined && legendBlock !== this.panel.panelStateManager.legendBlock) {
                    // make sure to close table if its been opened before
                    this.panel.close();
                }
                // creates a 'loader' panel to be opened if data hasn't loaded after 200ms
                this.deleteLoaderPanel();
                this.loadingPanel = new PanelLoader(this.mapApi, legendBlock);
                this.loadingTimeout = setTimeout(() => {
                    legendBlock.loadingPanel = this.loadingPanel;
                    legendBlock.formattedData;
                }, 200);

                this.findMatchingLayer(legendBlock);
            } else {
                this.panel.close();
            }
        });
    }

    findMatchingLayer(legendBlock: any) {
        if (legendBlock.blockType === 'node') {
            // make sure the item clicked is a node, and not group or other
            let layer;
            if (legendBlock.parentLayerType === 'esriDynamic') {
                layer = this.mapApi.layers.allLayers.find(function(l) {
                    return l.id === legendBlock.layerRecordId && l.layerIndex === parseInt(legendBlock.itemIndex);
                });
            } else {
                layer = this.mapApi.layers.getLayersById(legendBlock.layerRecordId)[0];
            }

            if (layer) {
                // if layer was created unsubscribe to layer added observable
                // create + open the enhancedTable
                this.legendBlock = legendBlock;
                this.panel.setLegendBlock(legendBlock);
                if (this.layerAdded !== undefined) {
                    this.layerAdded.unsubscribe();
                }
                this.loadingPanel.setSize(layer.table.maximize); //make sure loading panel is maximized/minimized according to config
                this.openTable(layer);
            } else {
                // if layer was not created, subscribe to layer added observable
                this.layerAdded = this.mapApi.layers.layerAdded.subscribe(layer => {
                    if (layer.id === legendBlock.layerRecordId) {
                        // if matching layer is found, call this function again so that enhancedTable can be created
                        this.findMatchingLayer(legendBlock);
                    }
                });
            }
        }
    }

    openTable(baseLayer) {
        if (baseLayer.panelStateManager === undefined) {
            // if no PanelStateManager exists for this BaseLayer, create a new one
            baseLayer.panelStateManager = new PanelStateManager(baseLayer, this.legendBlock);
        }
        this.panel.panelStateManager = baseLayer.panelStateManager;

        const attrs = baseLayer.getAttributes();
        this.attributeHeaders = baseLayer.attributeHeaders;
        if (attrs.length === 0) {
            // make sure all attributes are added before creating the table (otherwise table displays without SVGs)
            this.mapApi.layers.attributesAdded.pipe(take(1)).subscribe(attrs => {
                if (attrs.attributes.length > 0) {
                    this.configManager = new ConfigManager(baseLayer, this.panel);
                    this.panel.configManager = this.configManager;
                    this.createTable(attrs);
                } else {
                    this.openTable(baseLayer);
                }
            });
        } else {
            this.configManager = new ConfigManager(baseLayer, this.panel);
            this.panel.configManager = this.configManager;

            this.createTable({
                attributes: attrs,
                layer: baseLayer
            });
        }
    }

    deleteLoaderPanel() {
        if (this.loadingPanel) {
            this.loadingPanel.close();
        }
        if ($('#enhancedTableLoader') !== undefined) {
            $('#enhancedTableLoader').remove();
        }
    }

    createTable(attrBundle: AttrBundle) {
        let cols: Array<any> = [];
        const layerProxy = attrBundle.layer._layerProxy;

        layerProxy.formattedAttributes.then(a => {
            Object.keys(a.rows[0]).forEach(columnName => {
                if (
                    columnName === 'rvSymbol' ||
                    columnName === 'rvInteractive' ||
                    this.configManager.filteredAttributes.length === 0 ||
                    this.configManager.filteredAttributes.indexOf(columnName) > -1
                ) {
                    // only create column if it is valid according to config, or a symbol/interactive column

                    // set up the column according to the specifications from ColumnConfigManger
                    let column = this.configManager.columnConfigs[columnName];
                    // If the column has no config, create a default config for it
                    if (column === undefined) {
                        column = new ColumnConfigManager(this.configManager, undefined);
                        this.configManager.columnConfigs[columnName] = column;
                    }

                    let colDef: ColumnDefinition = {
                        width: column.width || 100,
                        minWidth: column.width,
                        headerName: this.attributeHeaders[columnName] ? this.attributeHeaders[columnName]['name'] : '',
                        headerTooltip: this.attributeHeaders[columnName] ? this.attributeHeaders[columnName]['name'] : '',
                        field: columnName,
                        filterParams: <FilterParameters>{},
                        filter: 'agTextColumnFilter',
                        floatingFilterComponentParams: { suppressFilterButton: true, mapApi: this.mapApi },
                        floatingFilterComponent: undefined,
                        suppressSorting: false,
                        suppressFilter: column.searchDisabled,
                        sort: column.sort,
                        hide:
                            this.configManager.filteredAttributes.length === 0 || column.value !== undefined
                                ? false
                                : column.column
                                ? !column.column.visible
                                : undefined
                    };

                    this.panel.notVisible[colDef.field] =
                        this.configManager.filteredAttributes.length === 0 ? false : column.column ? !column.column.visible : undefined;

                    // set up floating filters and column header
                    const fieldInfo = a.fields.find(field => field.name === columnName);
                    if (fieldInfo) {
                        const isSelector = column.isSelector;
                        const isStatic = column.isFilterStatic;

                        if (!column.searchDisabled || column.searchDisabled === undefined) {
                            // only set up floating filters if search isn't disabled
                            // floating filters of type number, date, text
                            // text can be of type text or selector
                            if (NUMBER_TYPES.indexOf(fieldInfo.type) > -1) {
                                setUpNumberFilter(colDef, isStatic, column.value, this.tableOptions, this.panel.panelStateManager);
                            } else if (fieldInfo.type === DATE_TYPE) {
                                setUpDateFilter(colDef, isStatic, this.mapApi, column.value, this.panel.panelStateManager);
                            } else if (fieldInfo.type === TEXT_TYPE && attrBundle.layer.table !== undefined) {
                                if (isSelector) {
                                    setUpSelectorFilter(
                                        colDef,
                                        isStatic,
                                        column.value,
                                        this.tableOptions,
                                        this.mapApi,
                                        this.panel.panelStateManager
                                    );
                                } else {
                                    setUpTextFilter(
                                        colDef,
                                        isStatic,
                                        this.configManager.lazyFilterEnabled,
                                        this.configManager.searchStrictMatchEnabled,
                                        column.value,
                                        this.mapApi,
                                        this.panel.panelStateManager
                                    );
                                }
                            }
                        }

                        setUpHeaderComponent(colDef, this.mapApi);
                    }

                    // symbols and interactive columns are set up for every table
                    setUpSymbolsAndInteractive(columnName, colDef, cols, this.mapApi, layerProxy);
                }
            });
            (<any>Object).assign(this.tableOptions, {
                columnDefs: cols,
                rowData: attrBundle.attributes
            });

            // Show toast on layer refresh is refresh interval is set
            const refreshInterval = this.legendBlock.proxyWrapper.layerConfig.refreshInterval;
            if (refreshInterval) {
                this.panel.toastInterval = setInterval(() => {
                    this.panel.showToast();
                }, refreshInterval * 60000);
            }

            this.panel.open(this.tableOptions, attrBundle.layer, this);
            this.tableApi = this.tableOptions.api;
        });
    }

    reloadTable(baseLayer) {
        this.panel.close();
        this.openTable(baseLayer);
    }
}

/* Helper function to set up symbols and interactive columns*/
function setUpSymbolsAndInteractive(columnName: string, colDef: any, cols: any, mapApi: any, layerProxy: any) {
    if (columnName === 'rvSymbol' || columnName === 'rvInteractive') {
        // symbols and interactive columns don't have options for sort, filter and have default widths
        colDef.suppressSorting = true;
        colDef.suppressFilter = true;
        colDef.lockPosition = true;

        if (columnName === 'rvSymbol') {
            colDef.maxWidth = 82;
            // set svg symbol for the symbol column
            colDef.cellRenderer = function(cell) {
                return cell.value;
            };
            colDef.cellStyle = function(cell) {
                return {
                    paddingTop: '7px'
                };
            };
        } else if (columnName === 'rvInteractive') {
            colDef.maxWidth = 40;
            // sets details and zoom buttons for the row
            let zoomDef = (<any>Object).assign({}, colDef);
            zoomDef.field = 'zoom';
            zoomDef.cellRenderer = function(params) {
                var eSpan = $(ZOOM_TEMPLATE(params.data[layerProxy.oidField]));
                mapApi.$compile(eSpan);
                params.eGridCell.addEventListener('keydown', function(e) {
                    if (e.key === 'Enter') {
                        eSpan.click();
                    }
                });
                params.eGridCell.style.padding = 0;
                return eSpan[0];
            };
            cols.splice(0, 0, zoomDef);
            colDef.cellRenderer = function(params) {
                var eSpan = $(DETAILS_TEMPLATE(params.data[layerProxy.oidField]));
                mapApi.$compile(eSpan);
                params.eGridCell.addEventListener('keydown', function(e) {
                    if (e.key === 'Enter') {
                        eSpan.click();
                    }
                });
                params.eGridCell.style.padding = 0;
                return eSpan[0];
            };
        }
        cols.splice(0, 0, colDef);
    } else {
        cols.push(colDef);
    }
}

/*Helper function to set up column headers*/
function setUpHeaderComponent(colDef, mApi) {
    colDef.headerComponent = CustomHeader;
    colDef.headerComponentParams = {
        mapApi: mApi
    };
}

interface AttrBundle {
    attributes: any[];
    layer: any;
}

export default interface TableBuilder {
    feature: string;
    id: string;
    _name: string;
    mapApi: any;
    tableOptions: GridOptions;
    tableApi: GridApi;
    panel: PanelManager;
    translations: any;
    configManager: ConfigManager;
    legendBlock: any;
    loadingPanel: PanelLoader;
    loadingTimeout: any;
    layerAdded: any;
}

interface ColumnDefinition {
    headerName: string;
    headerTooltip: string;
    minWidth?: number;
    maxWidth?: number;
    width?: number;
    field: string;
    headerComponent?: { new (): CustomHeader };
    headerComponentParams?: HeaderComponentParams;
    filter: string;
    filterParams?: any;
    floatingFilterComponent?: undefined;
    floatingFilterComponentParams: FloatingFilterComponentParams;
    cellRenderer?: (cellParams: any) => string | Element;
    suppressSorting: boolean;
    suppressFilter: boolean;
    lockPosition?: boolean;
    getQuickFilterText?: (cellParams: any) => string;
    sort?: string;
    hide?: boolean;
    cellStyle?: any;
}

interface HeaderComponentParams {
    mapApi: any;
}

interface FloatingFilterComponentParams {
    suppressFilterButton: boolean;
    mapApi: any;
}

interface FilterParameters {
    inRangeInclusive?: boolean;
    comparator?: Function;
    textCustomComparator?: Function;
    textFormatter?: Function;
}

TableBuilder.prototype.tableOptions = {
    enableSorting: true,
    floatingFilter: true,
    autoSizePadding: 75,
    suppressColumnVirtualisation: true,
    ensureDomOrder: true,
    defaultColDef: {
        width: 100
    }
};

TableBuilder.prototype.id = 'fancyTable';
TableBuilder.prototype._name = 'enhancedTable';

TableBuilder.prototype.translations = {
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

(<any>window).enhancedTable = TableBuilder;
