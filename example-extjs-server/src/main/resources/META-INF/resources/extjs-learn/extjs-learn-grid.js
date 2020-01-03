Ext.onReady(function () {

    var data = [
        ["1","name1","male","desc1","2019-01-01T12:23:40"],
        ["2","name2","female","desc2","2020-01-01T12:23:40"],
        ["3","name3","male","desc3","2019-05-01T12:23:40"],
        ["4","name4","male","desc4","2019-05-01T12:23:40"],
        ["5","name5","female","desc5","2019-05-01T12:23:40"]
    ];

    //定义表格的列，header代表列名，dataIndex代表列对应的数据名称
    //sortable是否允许排序（默认true）
    //renderer自定义函数
    var columns = [
        //序号
        new Ext.grid.RowNumberer(),
        {header:"编号",dataIndex:"id",sortable:false},
        {header:"名称",dataIndex:"name"},
        {header:"性别",dataIndex:"sex",renderer:renderSex},
        {header:"描述",dataIndex:"desc",renderer:renderDescn},
        // {header:"日期",dataIndex:"date",renderer:Ext.util.Format.dateRenderer('Y-m-d')}
        {header:"日期",dataIndex:"date",renderer:function(value){return Ext.Date.format(new Date(value), 'Y-m-d');}}
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
    //store3从rest接口中获取数据
    var store3 = Ext.create('Ext.data.Store',{
        proxy: {
            type:"ajax",
            url:"http://127.0.0.1:8010/remoting/rest/testDataQueryService/selectAll",
            reader:{
                type:"json",
                root:"",
                idProperty:"id"
            }
        },
        //该属性表示是否允许远程排序，设置为true后，进行排序会向后端接口进行请求，
        //请求中会新增sort、property、name、direction等参数说明排序的字段名称、升/降等
        remoteSort:false
    });

    //定义表格，renderTo代表表格显示的区域
    var grid = new Ext.grid.GridPanel({
        renderTo:Ext.getBody(),
        store:store3,
        columns:columns,
        height:400,
        width:600,
        //是否允许列拖动
        enableColumnMove:false,
        //是否允许列调整大小
        enableColumnResize:false,
        //是否显示隔行背影
        stripeRows:true,
        //设置读取数据前会显示加载的遮罩层
        loadMask:true,
        //自动分配列宽，总列宽在表格的width值的范围内
        forceFit:true,
        //viewConfig的参数会在GridView初始化的时候传递给GridView
        //设置行的样式，同时也可以对行做其他操作
        viewConfig:{
            enableRowBody:true,
            getRowClass:function (record,rowIndex,p,ds) {
                if(record.data.id == '2' && record.data.sex == 'female'){
                    console.info("record:"+record);
                    console.info("p:"+p);
                    console.info("ds:"+ds);
                    console.info("rowIndex:"+rowIndex);
                    return "green-row";
                }
            }
        },
        //选择模型 选择模型 RowModel(默认 行选择)  CellModel（单元格选择）CheckboxModel（复选框）
        //复选框设置 checkOnly设置只能点击复选框进行选择
        selModel: Ext.create('Ext.selection.CheckboxModel'),
        // selModel: Ext.create('Ext.selection.CellModel')
        //表格底部
        //表格分页工具
        bbar: Ext.create('Ext.PagingToolbar',{
            pageSize:3,
            store:store3,
            displayInfo:true,
            displayMsg:'显示第{0}条到{1}条记录，一共{2}条',
            emptyMsg:"没有记录"
        })
    });
    
    Ext.create('Ext.panel.Panel',{
        renderTo:Ext.getBody(),
        items:[
            grid,
            {
                //xtype可以作为类名的简写
                xtype:"button",
                text:"删除第二行",
                handler:function(){
                    //移除第二行
                    store.remove(store.getAt(1));
                    //刷新grid，重新计算序号
                    grid.view.refresh();
                }
            },
            {
                //xtype可以作为类名的简写
                xtype:"button",
                text:"获取选中的数据",
                handler:function(){
                   var selectedArray = grid.getSelectionModel().selected;
                   console.info(selectedArray);
                   alert("共选择了"+selectedArray.getCount() + "行");
                }
            }
        ]
    });

    //多重排序的设置
    // store3.sort([
    //     {
    //         property:"id",
    //         direction:"DESC"
    //     },{
    //         property:"name",
    //         direction:"ASC"
    //     }
    //     ]);

    //加载数据
    //params中start、limit对应分页查询的条件，会自动加在请求的后面
    //对应的后端接口应该做对应参数接收逻辑才能生效
    store3.load({params:{start:0,limit:3}});

});