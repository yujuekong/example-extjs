Ext.onReady(function () {
    /***************      ajax请求 start       ***************/
    var conn = Ext.create('Ext.data.Connection',{
        autoAbort:false,
        // defaultHeaders:{
        //     referer:'http://127.0.0.1:8010/'
        // },
        disableCaching:false,
        // extraParams:{
        //     name:'name'
        // },
        method:"GET",
        timeout:3000,
        url:"/remoting/rest/accAccountQueryService/selectAll"
    });

    conn.request({
        success:function (response) {
            console.info(response);
            Ext.Msg.alert("提示","查询成功！",null);
        },
        failure:function (response) {
            console.info(response);
            Ext.Msg.alert("提示","查询失败！",null);
        }
    });
    /************         ajax请求 end          ************/

    /************         Record定义 end          ************/
    //定义Person类
    //fields中的type类型有：auto、string、int、number、boolean、date
    Ext.define('Person',{
        extend:'Ext.data.Model',
        fields:[
            {name:'name',type:'string'},
            {name:'sex',type:'string'},
            {name:'age',type:'int'}
        ],
        changeName:function (value) {
            this.set('name',value);
        }
    });

    //创建对象
    var boy = Ext.create('Person',{
        name : 'xiaozhang',
        sex : '男',
        age : 50
    });

    console.info(boy.data.name);
    console.info(boy.data['name']);
    boy.changeName("小李");
    boy.set('age',69);
    console.info(boy.get('name'),boy.get('age'));

    /************         Record定义 end          ************/

    Ext.define('Account',{
        extend:'Ext.data.Model',
        fields:[
            {name:'accountId',type:'string'},
            {name:'phoneNumber',type:'string'},
            {name:'name',type:'string'},
            {name:'accountPwd',type:'string'},
            {name:'registerTime',type:'date'}
        ]
    });

   var store = Ext.create('Ext.data.Store',{
        model:'Account',
        proxy:{
            type:'ajax',
            url:'/remoting/rest/accAccountQueryService/selectAll',
            reader:{
                type:"json"
            }
        },
        autoLoad:true,
       //最大条数，默认是25条，设置为0则不做限制
        pageSize:0
   });

   Ext.create('Ext.Button',{
       text:"store按钮",
       renderTo:Ext.getBody(),
       handler:function(){
           console.info(store.getData());
           console.info(store.getCount());
           console.info(store.getAt(0).data);
       }
   });



});