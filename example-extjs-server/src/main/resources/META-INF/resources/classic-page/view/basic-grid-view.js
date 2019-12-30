/**
 * 这个例子展示了如何使用store创建grid，这个grid可以移动、隐藏列、重载页面和返回到你定位的地方
 * This example shows how to create a grid from a store. The grid is stateful so you
 * can move or hide columns, reload the page, and come back to the grid in the same state
 * you left it in.
 *
 * The cells are selectable due to use of the `enableTextSelection` option.
 *
 * It uses an ActionColumn to display clickable icons which are linked to controller methods.
 */
Ext.define('KitchenSink.view.grid.BasicGrid', {
    extend: 'Ext.grid.Panel',
    /**
     * xtype作为组件的别名，可用于优化组件的创建和渲染
     * 可以用于隐式创建组件
     * 例：
    // 显式创建
     var panel = new Ext.Panel({
    // ...
    items: [
        Ext.create('Ext.button.Button', {
            text: 'OK'
            })
         ]
    });

     // 隐式创建
     var panel = new Ext.Panel({
    // ...
      items: [{
        xtype: 'button',
        text: 'OK'
        }]
      });
     *
     *
     */
    xtype: 'array-grid',
    //控制器，处理事件逻辑
    controller: 'basicgrid',
    //关联依赖包
    requires: [
        'Ext.grid.column.Action',
        'KitchenSink.view.grid.BasicGridController'
    ],
    //表格的标题
    title: 'Basic Grid',
    //表格的宽
    width: 750,
    //表格的高
    height: 350,
    //数据集
    store: 'Companies',
    //TODO
    stateful: true,
    //是否可折叠
    collapsible: true,
    //多选
    multiSelect: true,
    //配合上面的stateful使用，状态管理的唯一ID
    stateId: 'stateGrid',
    //表格的header是否有边框
    headerBorders: false,
    //TODO
    signTpl: '<span style="' +
        'color:{value:sign(\'"#cf4c35"\',\'"#73b51e"\')}"' +
        '>{text}</span>',

    viewConfig: {
        enableTextSelection: true
    },

    // Reusable actions
    actions: {
        sell: {
            iconCls: 'array-grid-sell-col',
            tooltip: 'Sell stock',
            handler: 'onSellClick'
        },
        buy: {
            getClass: 'getBuyClass',
            getTip: 'getBuyTip',
            handler: 'onBuyClick'
        },
        suspendTrading: {
            tooltip: 'Toggles enabled status of all buy and sell actions anywhere in this view',
            text: 'Suspend Trading',
            glyph: 'xf256@FontAwesome',
            toggleHandler: 'onToggleTrading',
            enableToggle: true
        }
    },

    columns: [{
        text: 'Company',
        flex: 1,
        sortable: false,
        dataIndex: 'name'
    }, {
        text: 'Price',
        width: 95,
        sortable: true,
        formatter: 'usMoney',
        dataIndex: 'price'
    }, {
        text: 'Change',
        width: 80,
        sortable: true,
        renderer: 'renderChange',
        dataIndex: 'change'
    }, {
        text: '% Change',
        width: 100,
        sortable: true,
        renderer: 'renderPercent',
        dataIndex: 'pctChange'
    }, {
        text: 'Last Updated',
        width: 115,
        sortable: true,
        formatter: 'date("m/d/Y")',
        dataIndex: 'lastChange'
    }, {
        menuDisabled: true,
        sortable: false,
        xtype: 'actioncolumn',
        width: 50,
        items: ['@sell', '@buy']
    }],
    //表格底部
    bbar: [
        '@suspendTrading'
    ]
});