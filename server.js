var express = require('express')
var app = express()
var fs = require('fs')
var http = require('http')
var PORT = process.env.PORT || 5000
var https = require('https')
var forceSsl = require('express-force-ssl')
var opn = require('opn')
var key = fs.readFileSync('ssl/private.key')
var cert = fs.readFileSync('ssl/public.crt')



var options = {
    key: key,
    cert: cert,
    requestCert: false,
    rejectUnauthorized: false,
    passphrase: 'allangray'
}

var httpServer = http.createServer(app)
var httpsServer = https.createServer(options, app)


app.get('*', (req, res, next) => {

    //check if the connection is secured
    if (!req.secure) {
        //redirect to https connection
        res.writeHead(301, { "Location": "https://localhost:8000" + req.url })
        res.end()
    }
    else {
        //move to next route
        next()
    }
})
app.get('/', (req, res) => {

    res.send('hallo')
})

httpServer.listen(8080)
httpsServer.listen(8000)
opn('http://localhost:8080').then(process => {
    console.log("Process Spawned", process)
})
    .catch(reason => {
        console.log('ERROR-', reason)
    })