Ext.onReady(function () {
  var form = Ext.create('Ext.form.FormPanel',{
        title:"form",
        renderTo:Ext.getBody(),
        defaultType: 'textfield',
        buttonAlign:"center",
        frame:true,
        width:220,
        defaults:{
            labelAlign:"right",
            labelWidth:70
        },
        items:[
            {
                fieldLabel:"文本框"
            }
        ],
        buttons:[
            {
                text:"按钮"
            }
        ]
    });
});