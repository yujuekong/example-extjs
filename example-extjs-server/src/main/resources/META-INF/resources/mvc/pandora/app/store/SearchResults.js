Ext.define('Pandora.store.SearchResults', {
    extend: 'Ext.data.Store',
    requires: 'Pandora.model.SearchResults',
    model: 'Pandora.model.SearchResults',
    
    sorters: ['name']
});