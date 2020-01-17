Ext.define('Pandora.controller.SongController', {
    extend: 'Ext.app.Controller',

    //refs 定义getter方法，ref代表getter方法名，调用方式是getSongInfo()
    //selector代表返回的xtype类型
    //使用该定义的getter方法，会返回对应xtype的第一个组件，如果找不到，会返回undefined
    //主要针对component组件的获取
    refs: [{
        ref: 'songInfo',
        selector: 'songinfo'
    }, {
        ref: 'recentlyPlayedScroller',
        selector: 'recentlyplayedscroller'
    }
    ],
    //这种方式定义store,会自动生成getter方法，例：getRecentSongsStore()
    stores: ['RecentSongs'],
    
    init: function() {
        this.control({
            'recentlyplayedscroller': {
                selectionchange: this.onSongSelect
            }
        });
        
        this.application.on({
            stationstart: this.onStationStart,
            scope: this
        });
    },
    
    onStationStart: function(station) {
        var store = this.getRecentSongsStore();
        store.load({
            //callback属性自带三个参数function(records, operation, success)
            //records代表store的数据集
            //operation代表操作自身
            //success代表状态（true/false）
            callback: this.onRecentSongsLoad,
            params: {
                station: station.get('id')
            },            
            scope: this
        });
    },
    
    onRecentSongsLoad: function(songs, request) {
        var store = this.getRecentSongsStore(),
            selModel = this.getRecentlyPlayedScroller().getSelectionModel();

        // The data should already be filtered on the serverside but since we
        // are loading static data we need to do this after we loaded all the data
        store.filter('station', request._params.station);
        store.sort('played_date', 'DESC');

        selModel.select(store.last());
    },
    
    onSongSelect: function(selModel, selection) {
        this.getSongInfo().update(selection[0]);
    }
});
