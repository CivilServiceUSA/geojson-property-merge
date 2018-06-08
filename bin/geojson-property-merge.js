#!/usr/bin/env node

let program = require('commander'),
    fs = require("fs"),
    path = require("path"),
    gpm = require("../index.js");

program
    .version('0.1.0')
    .usage('[options] <GeoJSON File> <properties File> <output File>')
    .option('-e, --exclude [properties]', 'Comma delimited list of properties that will be excluded from the output file')
    .option('-g, --geojsonkey [geojsonkey]', 'Property in GeoJSON to match on')
    .option('-p, --propertieskey [propertieskey]', 'Key in properties array to match on')
    .parse(process.argv);


let inputPath, outputPath, propertiesFilePath, propData;

let options = {
    geojsonPrimaryKey: '',
    propertiesPrimaryKey: '',
    propertiesToExclude: [],
};

if(program.exclude){
    options.propertiesToExclude = program.exclude.split(',');
}

if(program.geojsonkey){
    options.geojsonPrimaryKey = program.geojsonkey;
}

if(program.propertieskey){
    options.propertiesPrimaryKey = program.propertieskey;
}

if (program.args.length < 2) {
    console.error("An input and outfile file is required");
    program.help();

    process.exit();
} else {

    if (program.args[0].indexOf("/") < 0) {
        inputPath = path.join(process.cwd(), program.args[0]);
    } else {
        inputPath = program.args[0];
    }

    if (program.args[1].indexOf("/") < 0) {
        propertiesFilePath = path.join(process.cwd(), program.args[1]);
    } else {
        propertiesFilePath = program.args[1];
    }

    if (program.args[2].indexOf("/") < 0) {
        outputPath = path.join(process.cwd(), program.args[2]);
    } else {
        outputPath = program.args[2];
    }

}

// Load properties into a variable
fs.open(propertiesFilePath, 'r', (err, fd) => {
    if (err) {
        if (err.code === 'ENOENT') {
            console.error(propertiesFilePath + ' does not exist');
            return;
        }

        throw err;
    }

    fs.readFile(propertiesFilePath, function(error, data) {
        if (error) {
            console.log(error);
        }

        propData = JSON.parse(data);
    });
});

fs.open(inputPath, 'r', (err, fd) => {
    if (err) {
        if (err.code === 'ENOENT') {
            console.error(inputPath + ' does not exist');
            return;
        }

        throw err;
    }

    fs.readFile(inputPath, function(error, data) {
        if (error) {
            console.log(error);
        }

        fs.writeFile(outputPath, JSON.stringify(gpm.merge(JSON.parse(data), propData, options)), function(error) {
            if (error) {
                console.error(error);
                program.help();
            } else {
                process.exit();
            }
        });
    });

});