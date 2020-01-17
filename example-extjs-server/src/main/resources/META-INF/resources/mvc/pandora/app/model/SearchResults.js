Ext.define('Pandora.model.SearchResults', {
    extend: 'Ext.data.Model',
    fields: ['id','name'],

    proxy: {
        type: 'ajax',
        url: '/mvc/pandora/data/searchresults.json',
        reader: {
            type: 'json',
            rootProperty: 'results'
        }
    }
});