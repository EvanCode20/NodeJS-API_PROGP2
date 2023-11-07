
const https = require('https');
const app = require('./app');
const fs = require('fs');


const port = 3001;

const server = https.createServer(
    {
        key: fs.readFileSync('keys/localhost-key.pem'),
        cert: fs.readFileSync('keys/localhost.pem')
    },app);

server.listen(port);
