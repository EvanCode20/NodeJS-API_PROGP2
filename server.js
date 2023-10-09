
const https = require('https');
const app = require('./app');
const fs = require('fs');


const port = 3001;

const server = https.createServer(
    {
        key: fs.readFileSync('keys/privatekey.pem'),
        cert: fs.readFileSync('keys/certificate.pem')
    },app);

server.listen(port);
