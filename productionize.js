#! /usr/bin/env node
// -*- js -*-

import * as fs from "fs";

(function () {
    fs.readFile('./build/package/assets/app.html', 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }
        var result = data.replace(/http:\/\/localhost:3000\/build\/(.*)\.js/g, './$1.min.js');

        fs.writeFile('./build/package/assets/app.html', result, 'utf8', function (err) {
            if (err) return console.log(err);
        });
    });

    fs.readFile('./build/package/manifest.json', 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }
        var result = data.replace(/http:\/\/localhost:3000\//g, '');

        fs.writeFile('./build/package/manifest.json', result, 'utf8', function (err) {
            if (err) return console.log(err);
        });
    });
})();
