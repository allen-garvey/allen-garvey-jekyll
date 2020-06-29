const path = require('path');
const serveImage = require('./serve-image');
const webpackConstants = require('../../webpack/constants');
const sections = require('../models/sections');
const webpack = require('../webpack');

function addRoutes(app, fs, websocketPort){
    app.get('/', async (req, res) => {
        const scriptContent = await webpack.getJs(fs);

        return res.render('home', {
            sections,
            scriptContent,
            websocketPort,
        });
    });
    
    app.get('/assets/main.css', (req, res) => {
        fs.readFile(path.resolve(webpackConstants.assetsPath, 'main.css'), (err, data) => {
            if (err) throw err;
            res.setHeader('Content-Type', 'text/css');
            res.send(data);
        });
    });

    app.get('/images/icons/:imageName', (req, res) => {
        serveImage(req, res, path.resolve(webpackConstants.imagesPath, 'icons'));
    });

    app.get('/images/:imageName', (req, res) => {
        serveImage(req, res, webpackConstants.imagesPath);
    });
}

module.exports = {
    addRoutes,
};