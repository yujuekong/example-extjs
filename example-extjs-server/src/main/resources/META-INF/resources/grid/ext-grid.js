Ext.onReady(function () {
    //定义model
    Ext.define('Book',{
        extend: 'Ext.data.Model',
        proxy: {
            type: 'ajax',
            reader: 'xml'
        },
        fields: [
            // set up the fields mapping into the xml doc
            // The first needs mapping, the others are very basic
            {name: 'Author', mapping: '@author.name'},
            'Title',
            'Manufacturer',
            'ProductGroup',
            'DetailPageURL'
        ]
    });

    // 创建数据store
    var store = Ext.create('Ext.data.Store', {
        model: 'Book',
        proxy: {
            // load using HTTP
            type: 'ajax',
            url: '../grid/sheldon.xml',
            // the return will be XML, so lets set up a reader
            reader: {
                type: 'xml',
                record: 'Item',
                totalProperty  : 'total'
            }
        }
    });
    //创建grid表格
    var grid = Ext.create('Ext.grid.Panel',{
        bufferedRenderer: false,
        store: store,
        columns: [
            {text: "Author", width: 120, dataIndex: 'Author', sortable: true},
            {text: "Title", flex: 1, dataIndex: 'Title', sortable: true},
            {text: "Manufacturer", width: 125, dataIndex: 'Manufacturer', sortable: true},
            {text: "Product Group", width: 125, dataIndex: 'ProductGroup', sortable: true}
        ],
        forceFit: true,
        height:210,
        split: true,
        region: 'north'
    });

    // 创建一个模版显示详细信息
    var bookTplMarkup = [
        'Title: <a href="{DetailPageURL}" target="_blank">{Title}</a><br/>',
        'Author: {Author}<br/>',
        'Manufacturer: {Manufacturer}<br/>',
        'Product Group: {ProductGroup}<br/>'
    ];
    var bookTpl = Ext.create('Ext.Template', bookTplMarkup);

    //创建一个面板，组装grid、template两个部分
    Ext.create('Ext.Panel', {
        renderTo: Ext.getBody(),
        frame: true,
        title: 'Book List',
        width: 580,
        height: 400,
        layout: 'border',
        items: [
            grid, {
                id: 'detailPanel',
                region: 'center',
                bodyPadding: 7,
                bodyStyle: "background: #ffffff;",
                html: 'Please select a book to see additional details.'
            }]
    });

    //定义选择listener事件
    grid.getSelectionModel().on('selectionChange',function (sm,selectionRecord) {
        if (selectionRecord.length) {
            var detailPanel = Ext.getCmp('detailPanel');
            detailPanel.update(bookTpl.apply(selectionRecord[0].data));
        }
    });

    //加载数据
    store.load();
});