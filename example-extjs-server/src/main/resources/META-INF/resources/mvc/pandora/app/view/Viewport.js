Ext.define('Pandora.view.Viewport', {
    extend: 'Ext.container.Viewport',
    layout: 'fit',
    
    requires: [
        'Pandora.view.NewStation',
        'Pandora.view.SongControls',
        'Pandora.view.StationsList',
        'Pandora.view.RecentlyPlayedScroller',
        'Pandora.view.SongInfo'
    ],
    
    initComponent: function() {
        this.items = {
            //dockedItems设置组件在容器中的停靠位置 dock分为：left、top、right、bottom
            dockedItems: [{
                dock: 'top',
                xtype: 'toolbar',
                height: 80,
                items: [{
                    xtype: 'newstation',
                    width: 150
                }, {
                    xtype: 'songcontrols',
                    flex: 1
                }, {
                    xtype: 'component',
                    html: 'Pandora<br>Internet Radio'
                }]
            }],
            layout: {
                //水平方式布局
                type: 'hbox',
                //自动拉伸填充
                align: 'stretch'
            },
            items: [{
                width: 250,
                xtype: 'panel',
                layout: {
                    //垂直布局
                    type: 'vbox',
                    align: 'stretch'
                },
                items: [{
                    xtype: 'stationslist',
                    flex: 1
                }, {
                    html: 'Ad',
                    height: 250,
                    xtype: 'panel'
                }]
            }, {
                xtype: 'container',
                flex: 1,
                border: false,
                layout: {
                    type: 'vbox',
                    align: 'stretch'
                },
                items: [{
                    xtype: 'recentlyplayedscroller',
                    height: 250
                }, {
                    xtype: 'songinfo',
                    flex: 1
                }]
            }]
        };
        
        this.callParent();
    }
});