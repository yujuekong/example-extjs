Ext.define('Pandora.model.Station', {
    extend: 'Ext.data.Model',
    fields: ['id', 'name'],
    
    proxy: {
        type: 'ajax',
        url: '/mvc/pandora/data/stations.json',
        reader: {
            type: 'json',
            rootProperty: 'results'
        }
    }
});