Ext.define('Pandora.model.Song', {
    extend: 'Ext.data.Model',
    fields: ['id', 'name', 'artist', 'album', 'played_date', 'station'],
    
    proxy: {
        type: 'ajax',
        url: '/mvc/pandora/data/songs.json',
        reader: {
            type: 'json',
            rootProperty: 'results'
        }
    }
});