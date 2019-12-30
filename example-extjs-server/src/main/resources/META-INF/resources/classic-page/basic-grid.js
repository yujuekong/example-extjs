Ext.onReady(function () {

    Ext.create('Ext.container.Viewport',{
        layout:"border",
        id:"basic-grid",
        // requires:[
        //     'KitchenSink.view.grid.BasicGridController',
        //     'KitchenSink.store.Companies',
        //     'KitchenSink.view.grid.BasicGrid',
        //     'KitchenSink.model.Company'],
        controller:"basicgrid",
        renderTo:Ext.getBody(),
        items:[
            Ext.create('KitchenSink.view.grid.BasicGrid', {
                border: false,
                region: 'center'
            })
        ]
    });

});