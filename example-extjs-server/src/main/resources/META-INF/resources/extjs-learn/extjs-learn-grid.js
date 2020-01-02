Ext.onReady(function () {

    var data = [
        ["1","name1","male","desc1","2019-01-01T12:23:40"],
        ["2","name2","female","desc2","2020-01-01T12:23:40"],
        ["3","name3","male","desc3","2019-05-01T12:23:40"]
    ];

    //定义表格的列，header代表列名，dataIndex代表列对应的数据名称
    //sortable是否允许排序（默认true）
    //renderer自定义函数
    var columns = [
        {header:"编号",dataIndex:"id",sortable:false},
        {header:"名称",dataIndex:"name"},
        {header:"性别",dataIndex:"sex",renderer:renderSex},
        {header:"描述",dataIndex:"desc",renderer:renderDescn},
        {header:"日期",dataIndex:"date",renderer:Ext.util.Format.dateRenderer('Y-m-d')}
    ];

    //定义一个转换性别的函数
    function renderSex(value) {
        if(value === 'male'){
            return "<span style=\'color: red;font-weight: bold\'>男</span>";
        }else{
            return "<span style=\'color: green;font-weight: bold\'>女</span>";
        }
    };
    //展示列中函数的所有参数
    function renderDescn(value, cellmeta, record, rowIndex, columnIndex, store) {
        var str = "<input type='button' value='查看详细信息' onclick='alert(\"" +
            "这个单元格的值是：" + value + "\\n" +
            "这个单元格的配置是：{cellId:" + cellmeta.cellId + ",id:" + cellmeta.id + ",css:" + cellmeta.css + "}\\n" +
            "这个单元格对应行的record是：" + record + "，一行的数据都在里边\\n" +
            "这是第" + rowIndex + "行\\n" +
            "这是第" + columnIndex + "列\\n" +
            "这个表格对应的Ext.data.Store在这里：" + store + "，随便用吧。" +
            "\")'>";
        return str;
    };

    //定义表格的数据集，fields中的name对应columns中定义的dataIndex
    //mapping表示数据在第几列显示
    //store中是直接从内存中读取数据
    //fields中type定义数据类型，dateFormat代表格式化
    var store = new Ext.data.ArrayStore({
        data:data,
        fields:[
            {name:"id",mapping:0},
            {name:"name",mapping:1},
            {name:"sex",mapping:2},
            {name:"desc",mapping:3},
            {name:"date",type:'date',dateFormat:'Y-m-dTH:i:s',mapping:4}
        ]
    });
    //store2是从外部文件中读取数据
    var store2 = Ext.create('Ext.data.Store',{
        proxy: new Ext.data.ScriptTagProxy({url:'http://www.mossle.com/data.json'}),
        reader: new Ext.data.ArrayReader({},[
            {name:'id'},
            {name:'name'},
            {name:'desc'}
        ]),
        fields:[
            {name:"id",mapping:0},
            {name:"name",mapping:1},
            {name:"desc",mapping:2}
        ]
    });


    //定义表格，renderTo代表表格显示的区域
    var grid = new Ext.grid.GridPanel({
        renderTo:Ext.getBody(),
        store:store,
        columns:columns,
        height:400,
        width:500,
        //是否允许列拖动
        enableColumnMove:false,
        //是否允许列调整大小
        enableColumnResize:false,
        //是否显示隔行背影
        stripeRows:true,
        //设置读取数据前会显示加载的遮罩层
        loadMask:true,
        //自动分配列宽，总列宽在表格的width值的范围内
        forceFit:true
    });

    //从内存中加载数据
    store.load();

});