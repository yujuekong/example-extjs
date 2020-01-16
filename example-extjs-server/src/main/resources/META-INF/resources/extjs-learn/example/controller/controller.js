Ext.define('Example.controller.ExampleController',{
    extend:'Ext.app.Controller',
    alias:'controller.exampleController',
    views:['ViewPort@Example.view','GridView@Example.view'],
    stores:['GridStore@Example.store'],
    models:['Patient@Example.model']
});