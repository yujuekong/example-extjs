Ext.define('Pandora.controller.StationController', {
    extend: 'Ext.app.Controller',
    alias:"controller.stationController",
    refs: [{
        ref: 'stationsList',
        selector: 'stationslist'
    }],

    stores: ['Stations', 'RecentSongs','SearchResults'],
    
    init: function() {
        this.control({
            //为Panel组件stationslist绑定selectionchange等事件
            'stationslist': {
                selectionchange: this.onStationSelect
            },
            //为组件newstation（select控件）绑定select事件
            'newstation': {
                select: this.onNewStationSelect
            }
        });
    },
    
    onLaunch: function() {
        var stationsStore = this.getStationsStore();
        var searchResultStore = this.getSearchResultsStore();
        stationsStore.load({
            callback: this.onStationsLoad,
            scope: this
        });
        searchResultStore.load();
    },

    onStationsLoad: function() {
        var stationsList = this.getStationsList();
        stationsList.getSelectionModel().select(0);
    },
    
    onStationSelect: function(selModel, selection) {
        this.application.fireEvent('stationstart', selection[0]);
    },
    
    onNewStationSelect: function(field, selection) {

        var selected = selection.data,
            store = this.getStationsStore(),
            list = this.getStationsList();

        if (selected && !store.getById(selected.id)) {
            store.add(selected);
            list.getSelectionModel().select(selected);
        }
    },

    onFilterDate: function () {
        console.info("filterDate");

        var store = this.getStationsStore();

        store.sort('played_date');

    },

    onFilterName: function () {
        console.info("filterName");

        var store = this.getStationsStore();

        store.sort('name');
    }
});
