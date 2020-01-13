Ext.onReady(function () {
    //htmlEditor的初始化
    Ext.QuickTips.init();

    var form = Ext.create('Ext.form.FormPanel', {
        title: "form",
        renderTo: Ext.getBody(),
        defaultType: 'textfield',
        buttonAlign: "center",
        frame: true,
        width: 220,
        defaults: {
            labelAlign: "right",
            labelWidth: 70
        },
        items: [
            {
                fieldLabel: "文本框"
            }
        ],
        buttons: [
            {
                text: "按钮"
            }
        ]
    });

    var formAll = Ext.create('Ext.form.FormPanel',{
        title: "form",
        renderTo: Ext.getBody(),
        defaultType: 'textfield',
        buttonAlign: "center",
        frame: true,
        width: 600,
        defaults: {
            labelAlign: "right",
            labelWidth: 70
        },
        items: [{
            xtype: 'container',
            layout: 'column',
            items: [{
                columnWidth:.7,
                xtype:'fieldset',
                checkboxToggle:true,
                title: '单纯输入',
                autoHeight:true,
                defaults: {width: 300},
                defaultType: 'textfield',
                items: [{
                    fieldLabel: '文本',
                    name: 'text'
                },{
                    xtype: 'numberfield',
                    fieldLabel: '数字',
                    name: 'number'
                },{
                    xtype:"combo",
                    fieldLabel: '选择',
                    name: 'combo',
                    store: new Ext.data.SimpleStore({
                        fields: ['value', 'text'],
                        data: [
                            ['value1', 'text1'],
                            ['value2', 'text2']
                        ]
                    }),
                    displayField: 'text',
                    valueField: 'value',
                    mode: 'local',
                    emptyText:'请选择',
                    listeners: {
                        select:function (value) {
                            console.info(value);
                            Ext.Msg.alert("提示","你选择的是："+value.getSelection().getData().text,null);
                        }
                    }
                },{
                    xtype: 'datefield',
                    fieldLabel: '日期',
                    name: 'date'
                },{
                    xtype: 'timefield',
                    fieldLabel: '时间',
                    name: 'time'
                },{
                    xtype: 'textarea',
                    fieldLabel: '多行',
                    name: 'textarea'
                },{
                    xtype: 'hidden',
                    name: 'hidden'
                }]
            },{
                xtype: 'container',
                columnWidth:.3,
                layout:'form',
                items:[{
                    id:'selectAll',
                    xtype:'fieldset',
                    checkboxToggle:true,
                    title: '多选',
                    autoHeight:true,
                    defaultType: 'checkbox',
                    hideLabels: true,
                    style: 'margin-left:10px;',
                    bodyStyle: 'margin-left:20px;',
                    items: [{
                        boxLabel: '首先要穿暖',
                        name: 'check',
                        value: '1',
                        checked: true,
                        width: 'auto'
                    },{
                        boxLabel: '然后要吃饱',
                        name: 'check',
                        value: '2',
                        checked: true,
                        width: 'auto'
                    },{
                        boxLabel: '房子遮风避雨',
                        name: 'check',
                        value: '3',
                        width: 'auto'
                    },{
                        boxLabel: '行路方便',
                        name: 'check',
                        value: '4',
                        width: 'auto'
                    }],
                    listeners:{
                        added:function (object) {
                            console.info(object);
                        }
                    }
                },{
                    xtype:'fieldset',
                    checkboxToggle:true,
                    title: '单选',
                    autoHeight:true,
                    defaultType: 'radio',
                    hideLabels: true,
                    style: 'margin-left:10px;',
                    bodyStyle: 'margin-left:20px;',
                    items: [{
                        boxLabel: '渴望自由',
                        name: 'rad',
                        value: '1',
                        checked: true,
                        width: 'auto'
                    },{
                        boxLabel: '祈求爱情',
                        name: 'rad',
                        value: '2',
                        width: 'auto'
                    }]
                }]
            }]
        },{
            xtype: 'container',
            layout: 'form',
            items: [{
                labelAlign: 'top',
                xtype: 'htmleditor',
                fieldLabel: '在线编辑器',
                id: 'editor',
                anchor: '98%',
                height: 200
            }]
        }],
        buttons: [{
            text: '保存',
            handler:function () {
                console.info(Ext.getCmp("selectAll"));
                Ext.Msg.alert('信息',"保存",null);
            }
        },{
            text: '读取'
        },{
            text: '取消'
        }]
    });



});