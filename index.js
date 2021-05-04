const waitUntil = require("wait-until");
const fs = require("fs-extra");

function copyCasperTheme() {
    let source = "content/themes/casper";
    let destination = `${process.env["paths__contentPath"]}/themes/casper`;
    console.log(`copying ${source} to ${destination}`);
    fs.copySync(source, destination);
}

copyCasperTheme();

require("./ghost");

// const binaryMimeTypes = [
//     'application/javascript',
//     'application/json',
//     'application/octet-stream',
//     'application/xml',
//     'application/zip',
//     'font/eot',
//     'font/opentype',
//     'font/otf',
//     'image/jpeg',
//     'image/png',
//     'image/svgxml',
//     'image/x-icon',
//     'text/comma-separated-values',
//     'text/css',
//     'text/html',
//     'text/javascript',
//     'text/plain',
//     'text/text',
//     'text/xml'
// ];

const awsServerlessExpress = require("aws-serverless-express");
// const server = awsServerlessExpress.createServer(ghostApp, null, binaryMimeTypes);

exports.handler = (event, context) => {
    let fulfilRequest = () => {
        const server = require("./core/boot").server;
        context.callbackWaitsForEmptyEventLoop = false;
        return awsServerlessExpress.proxy(server, event, context);
    };
    if (require("./core/boot").started) {
        return fulfilRequest();
    }
    // Site is starting up, waiting a second then retry.
    waitUntil()
        .interval(1000)
        .times(Infinity)
        .condition(() => {
            return require("./core/boot").started;
        })
        .done(fulfilRequest);
};
