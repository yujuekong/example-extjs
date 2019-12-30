Ext.onReady(function () {
    Ext.create('Ext.tab.Panel', {
        renderTo: Ext.getBody(),
        height: 100,
        width: 200,
        floating: true,
        draggable: true,
        shadow: true,
        items: [
            {
                // xtype:"panel",
                title: "Tab one",
                html: "The first tab",
                listeners: {
                    render: function () {
                        Ext.MessageBox.alert("BoxOne", "The first box");
                    }
                }
            },
            {
                title: "Tab Two",
                html: "The Second tab",
                listeners: {
                    render: function () {
                        Ext.MessageBox.alert("BoxTwo", "The second box");
                    }
                }
            }
        ]
    });
});