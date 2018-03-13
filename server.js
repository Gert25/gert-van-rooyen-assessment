var express = require('express')
var app = express()
var fs = require('fs')
var http = require('http')
var https = require('https')
var PORT = process.env.PORT || 5000
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

httpsServer.on('listen', () => {
    console.log("NEW SESSION")
})
httpsServer.on('secureConnection', () => {
    //In order for this method to run you need to make an http request to the server
    //you can test this running the following in your terminal {curl http://localhost:8000/ -i}

    //retrieve files once a secure connection has been established
    var users = fs.readFileSync('app/resources/user.txt', 'utf-8')
    var tweets = fs.readFileSync('app/resources/tweet.txt', 'utf-8')
    try {
        var testing = fs.readFileSync('blala.txt')
    }
    catch (e) {
        console.log(e)
    }

    console.log("*************USERS*************", users)
    console.log("*******************TWEETS*********", tweets)

    var userRecords = users.trim().split('\r\n')

    console.log('LENGTH ', userRecords.length)
    userRecords.forEach(element => {
        console.log('RECORED', element)
    })
    console.log("user records:", userRecords)

})
//open app in defualt browser.
// opn('http://localhost:8080')
//     .then(process => {
//         console.log("Process Spawned", process)
//     })
//     .catch(reason => {
//         console.log('ERROR-', reason)
//     })