Ext.application({
    name: 'Pandora',
    
    autoCreateViewport: true,
    //指定配置选项，设置相应的路径
    appFolder: 'mvc/pandora/app',

    models: ['Station', 'Song'],    
    stores: ['Stations', 'RecentSongs', 'SearchResults'],
    controllers: ['Station', 'Song']
});