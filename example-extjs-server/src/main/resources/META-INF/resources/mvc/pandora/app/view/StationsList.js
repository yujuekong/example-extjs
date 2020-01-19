Ext.define('Pandora.view.StationsList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.stationslist',
    requires:['Pandora.controller.StationController'],
    store: 'Stations',
    title: 'Stations',
    hideHeaders: true,
    columns:[{
        dataIndex: 'name',
        flex: 1
    }],
    controller:'stationController',
    dockedItems:[{
        dock: 'bottom',
        xtype: 'toolbar',
        items: [{
            xtype: 'button',
            text: 'Settings',
            listeners: {
                click:'onFilterDate'
            }
        }, {
            //按钮组
            xtype: 'buttongroup',
            items: [{
                text: 'By Date',
                listeners: {
                    click:'onFilterDate'
                }
            }, {
                text: 'ABC',
                listeners: {
                    click:'onFilterName'
                }
            }]
        }]
    }]

});