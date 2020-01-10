Ext.onReady(function () {
    var data = [
        [1.1,1,new Date(),true],
        [1.5,2,new Date(),false],
        [1.9,0,new Date(),true],
        [2.1,1,new Date(),false],
        [13.1,2,new Date(),true]
    ];

    var store = new Ext.data.ArrayStore({
        data:data,
        fields:[
            {name:"number",mapping:0},
            {name:"comboBox",mapping:1},
            {name:"date",mapping:2},
            {name:"checkBox",mapping:3}
        ]
    });

    var comboData = [
        ["0","新版Ext教程"],
        ["1","Ext在线支持"],
        ["2","Ext扩展"]
    ];

    //限制输入类型的column
    var columns = [
        {
            header:"数字列",
            dataIndex:"number",
            editor:new Ext.form.NumberField({
                //是否允许为空
                allowBlank:false,
                //最大值
                maxValue:10,
                minValue:0
            })
        },
        {
            header:"选择列",
            dataIndex:"comboBox",
            editor:new Ext.form.ComboBox({
                store:Ext.create('Ext.data.SimpleStore',{
                    fields:['value','text'],
                    data:comboData
                }),
                emptyText:"请选择",
                //数据获取模式
                mode:"local",
                //触发器动作
                triggerAction:"all",
                //指定value对应的字段
                valueField:"value",
                //编辑状态时显示的字段
                displayField:"text",
                //是否只读
                editable:false
            }),
            renderer: function(value){
                //选择列显示在页面的数据，非编辑状态下的显示
                return comboData[value][1];
            }
        },
        {
            header:"日期列",
            dataIndex:"date",
            editor:Ext.create('Ext.form.DateField',{
                format:'Y-m-d',
                minValue:'2007-12-14',
                disabledDays:[0,6],
                disabledDaysText:"只能选择工作日"
            }),
            renderer: function (value) {
                return Ext.Date.format(value,"Y-m-d");
            }
        },
        {
            header:"判断列",
            dataIndex:"checkBox",
            editor:Ext.create('Ext.form.Checkbox',{
                allowBlank:false
            }),
            renderer: function (value) {
                return value ? "是" : "否";
            }
        }
    ];

    var grid = Ext.create('Ext.grid.GridPanel',{
        renderTo:Ext.getBody(),
        store:store,
        columns:columns,
        height:400,
        width:600,
        forceFit:true,
        //插件
        plugins:[
            //表格单元格编辑插件,要配合columns中的editor使用才能生效
            Ext.create('Ext.grid.plugin.CellEditing',{
                //配置单击、双击进行编辑
                clicksToEdit:1
            })
        ]
    });


});