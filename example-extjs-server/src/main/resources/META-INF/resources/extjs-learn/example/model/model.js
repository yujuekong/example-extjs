//定义患者Model
Ext.define('Example.model.Patient',{
    extend:'Ext.data.Model',
    fields:[
        {name:'id',type:'string'},
        {name:'name',type:'string'},
        {name:'age',type:'int'},
        {name:'gender',type:'string'},
        {name:'address',type:'string'},
        {name:'birthOfDate',type:'date'}
    ]
});