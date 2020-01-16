Ext.define('Example.view.ViewPort',{
    extend:'Ext.container.Viewport',
    layout:"border",
    items:[
        {
            region:"north",
            // html:"head"
            //引用html上已经写好的静态页面，值为html片段的id
            //可以作为定制页面的一种方式
            contentEl:"head"
        },
        {
            region:"south",
            contentEl:"foot"
        },
        {
            region:"east",
            html:"form"
        }
        // {
        //     region:'center',
        //     items:[
        //         gridView
        //     ]
        // }
    ]
});