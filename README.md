![Civil Services Logo](https://cdn.civil.services/common/github-logo.png "Civil Services Logo")

__Civil Services__ is a collection of tools that make it possible for citizens to be a part of what is happening in their Local, State & Federal Governments.

[![Donate](https://cdn.civil.services/donate-button.png)](https://www.paypal.me/civilservices)


# geojson-property-merge

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)](https://raw.githubusercontent.com/CivilServiceUSA/geojson-property-merge/master/LICENSE)  [![GitHub contributors](https://img.shields.io/github/contributors/CivilServiceUSA/geojson-property-merge.svg)](https://github.com/CivilServiceUSA/geojson-property-merge/graphs/contributors)

Merge properties from a data set into the matching features of a GeoJSON object. This package can be used via the command line or inside your existing project.
## Installation

````
$ npm install CivilServiceUSA/geojson-property-merge --save
````

## Command Line Usage:

The examples directory contains two files; `states.geojson` containing the borders of states in the United States, and 
`states.json` containing additional properties for each of the states.  The follow example will add the properties of 
`states.json` to the appropriate feature in the geojson file, omitting the properties "state" and "slug" from the output file.

````
$ ./bin/geojson-property-merge.js --exclude state,slug --geojsonkey NAME --propertieskey state ./examples/states.geojson ./examples/states.json mergedOutput.geojson 
````


## Example Data

Thanks to [Eric Celeste](http://eric.clst.org/) for making available a simplified [GeoJSON file of the US States outlines.](http://eric.clst.org/tech/usgeojson/)


## License

MIT