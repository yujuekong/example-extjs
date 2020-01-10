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
        {header:"编号",dataIndex:"id",sortable:false,editor:{allowBlank:false}},
        {header:"名称",dataIndex:"name",editor:{allowBlank:false}},
        {header:"性别",dataIndex:"sex",renderer:renderSex,editor:{allowBlank:false}},
        {header:"描述",dataIndex:"desc",renderer:renderDescn,editor:{allowBlank:false}},
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
    //TODO 要解决一下idProperty属性在新增的时候必须有值的问题
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
        remoteSort:false,
        //该属性设置为true后，store进行remove、load操作时，会自动清除掉modified标记，避免
        //下次提交的时候会带上之前的modified标记
        pruneModifiedRecords:true,
        //分组属性 还要需要设置grid中的features属性，才能生效
        groupField:'sex',
        //排序
        sorter:[{property:"id",direction:"DESC"}]
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
        }),
        //插件
        plugins:[
            //表格单元格编辑插件,要配合columns中的editor使用才能生效
            Ext.create('Ext.grid.plugin.CellEditing',{
                //配置单击、双击进行编辑
                clicksToEdit:1
            })
        ],
        //表格头部
        tbar:[
            '-',{
                text:"添加一行",
                handler:function () {
                    var p = {
                        id:"",
                        name:"",
                        desc:"",
                        sex:"",
                        date:new Date()
                    };
                    store3.insert(0,p);
                }
            },'-',{
                text:"删除一行",
                handler:function () {
                    Ext.Msg.confirm('信息',"确定要删除？",function(btn){
                        if(btn === 'yes'){
                            var sm = grid.getSelectionModel();
                            var record = sm.getSelection()[0];
                            console.info(record);
                            store3.remove(record);
                        }
                    })
                }
            },'-',{
                text:"保存",
                handler:function () {
                    //获取表格中修改过的数据，并copy一份，以防影响原有的数据
                    var modifyModel = store3.getModifiedRecords().splice(0);
                    console.info(modifyModel);
                    //获取对象数据
                    var jsonArray = [];
                    Ext.each(modifyModel,function (item) {
                        jsonArray.push(item.data);
                    });
                    console.info(jsonArray);
                    //发送请求
                    Ext.Ajax.request({
                        method:"POST",
                        url:"http://127.0.0.1:8010/remoting/rest/testDataQueryService/save",
                        success:function (response) {
                            console.info(response);
                            Ext.Msg.alert('信息',"保存成功！",function () {
                                store3.reload();
                            });
                        },
                        failure:function () {
                            Ext.Msg.alert('信息',"保存失败！");
                        },
                        params: Ext.encode(jsonArray)
                    })
                }
            }
        ],
        //分组排序配置属性
        features:[{ftype:"grouping"}]
    });

    //定义表格大小可以拖动
    var rs = Ext.create('Ext.Resizable',grid.getEl(),{
        wrap:true,
        minHeight:100,
        //是否显示可以拖动的图形
        pinned:true,
        //可以拖动的地方,对应 上n、下s、左w、右e
        handles:"s"
    });
    rs.on('resize',function (resizer,width,height,event) {
        grid.setHeight(height);
    },grid);

    //实现右键菜单
    var contextMenu = Ext.create('Ext.menu.Menu',{
        id:"theContextMenu",
        items:[
            {
                text:"查看详情",
                handler:function(){
                    var sm = grid.getSelectionModel();
                    var record = sm.getSelection()[0];
                    alert("当前行的id是："+record.id);
                }
            }
            ]
    });
    //监听行右键菜单事件
    grid.on('itemcontextmenu',function (view,record,item,index,e) {
        //阻止浏览器默认的右键菜单
        e.preventDefault();
        //显示已定义的contextMenu菜单
        contextMenu.showAt(e.getXY());
    });


    
    Ext.create('Ext.panel.Panel',{
        renderTo:Ext.getBody(),
        width:650,
        height:450,
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