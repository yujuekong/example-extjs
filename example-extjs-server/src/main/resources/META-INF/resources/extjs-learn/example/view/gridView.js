var columns = [
    {
        text: '姓名',
        dataIndex: 'name',
        sortable: false
    },
    {
        text: '年龄',
        dataIndex: 'name',
        sortable: false
    },
    {
        text: '性别',
        dataIndex: 'name',
        sortable: false
    },
    {
        text: '生日',
        dataIndex: 'name',
        sortable: false
    },
    {
        text: '住址',
        dataIndex: 'name',
        sortable: false
    }

];

Ext.define('Example.view.GridView',{
    extend:'Ext.panel.GridPanel',
    title: '患者信息列表',
    columns: columns,
    store:'gridStore',
    rowNumbers: {
        text: '行号'
    },
    //自动分配列宽，总列宽在表格的width值的范围内
    forceFit: true,
    bbar: Ext.create('Ext.PagingToolbar', {
        pageSize: 10,
        store: store,
        displayInfo: true,
        displayMsg: '显示第{0}条到{1}条记录，一共{2}条',
        emptyMsg: "没有记录"
    })
});

