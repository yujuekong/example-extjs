Ext.application({
    //命名空间
    name: 'Pandora',
    //自动创建view
    autoCreateViewport: true,
    //指定配置选项，设置相应的路径
    appFolder: 'mvc/pandora/app',
    //加载model模块
    models: ['Station', 'Song'],
    //加载store
    stores: ['Stations', 'RecentSongs', 'SearchResults'],
    //加载controller
    controllers: ['StationController', 'SongController']
});