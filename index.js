(function() {

    function gpm(geojson, propertiesArray, options) {

        options = options || {};

        let geojsonPrimaryKey = options.geojsonPrimaryKey || '';
        let propertiesPrimaryKey = options.propertiesPrimaryKey || '';
        let propertiesToExclude = options.propertiesToExclude || [];

        function filterValue(obj, key, value) {
            return obj.find(function(v){ return v[key] === value});
        }

        geojson.features.forEach(function(item){

            data = filterValue(propertiesArray, propertiesPrimaryKey, item.properties[geojsonPrimaryKey]);

            if(data !== undefined){

                // Remove any keys we don't want
                if(propertiesToExclude.length){
                    propertiesToExclude.forEach(function(propKey){
                        delete data[propKey];
                    });
                }

                // We have a matching record, merge it's properties in
                const mergedProperties = Object.assign(data, item.properties);

                item.properties = mergedProperties;
            }
        });

        return geojson;
    }

    module.exports = gpm;
    module.exports.merge = gpm;

}());