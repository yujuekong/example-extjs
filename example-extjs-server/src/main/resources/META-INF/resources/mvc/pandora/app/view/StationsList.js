Ext.define('Pandora.view.StationsList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.stationslist',

    store: 'Stations',
    title: 'Stations',
    hideHeaders: true,
    columns:[{
        dataIndex: 'name',
        flex: 1
    }],
    dockedItems:[{
        dock: 'bottom',
        xtype: 'toolbar',
        items: [{
            xtype: 'button',
            text: 'Settings',
            handler: 'settings'
        }, {
            //按钮组
            xtype: 'buttongroup',
            items: [{
                text: 'By Date',
                handler: 'onFilterDate'
            }, {
                text: 'ABC',
                handler: 'onFilterName'
            }]
        }]
    }]

});