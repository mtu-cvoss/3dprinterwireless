const express = require('express');
const fs = require('fs');
const path = require('path');
const formidable = require('formidable');

const app = express();

app.post('/api/upload', (req, res, next) => {
        const form = new formidable.IncomingForm();
        form.parse(req, function(err, fields, files) {
            console.log("file received " + files.filetoupload.name);
            var oldPath = files.filetoupload.path;
            console.log(path.join(__dirname));
            var newPath = path.join(__dirname + '/../gcode/' + files.filetoupload.name);
            var rawData = fs.readFileSync(oldPath);
            fs.writeFile(newPath, rawData, function(err) {
                if(err) console.log(err);
                return res.send("Successfully uploaded");
            });
        });
});

app.listen(8080, function(err) {
    if(err) console.log(err);
    console.log('Server listening on Port 8080');
});