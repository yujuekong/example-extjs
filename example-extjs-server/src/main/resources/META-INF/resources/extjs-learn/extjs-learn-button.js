Ext.define('app.ButtonController',{
    extend:'Ext.app.ViewController',
    alias:'controller.buttonController',
    onButtonClick: function () {
        Ext.Msg.alert('提示',"这是一个Button",null);
    },
    onAjaxRemote:function () {
        FW.Remote.ajax({
            method:'GET',
            url:FW.App.getAppPath()+'remoting/rest/accAccountQueryService/selectAllNew',
            success:function (response,opt) {
                console.info(response);
                console.info(opt);
                Ext.Msg.alert('提示',"请求数据成功",null);
            },
            failure:function (response,opt) {
                console.info(response);
                console.info(opt);
            }
        });
    }
});

Ext.define('app.ButtonView',{
    extend:'Ext.Panel',
    controller:'buttonController',
    items: [
        {
            xtype:'button',
            text:'按钮',
            id:'myButton',
            // handler:'onButtonClick',
            listeners:{
                mouseover:function () {
                    this.hide();
                },
                hide:function () {
                    Ext.defer(function () {
                        this.show();
                    },1000,this);
                },
                autoHideButton:function () {
                    Ext.Msg.alert('提示',"这是一个Button",null);
                },
                beforehide:'onAjaxRemote'
            }
        }
    ]
});

Ext.onReady(function () {
    var button = Ext.create('app.ButtonView',{
        renderTo:Ext.getBody()
    });

    Ext.getCmp("myButton").fireEvent('autoHideButton');

});


