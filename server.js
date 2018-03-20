var express = require('express')
var app = express()
var fs = require('fs')
var http = require('http')
var https = require('https')
var PORT = process.env.PORT || 5000
var opn = require('opn')
var key = fs.readFileSync('ssl/server.key')
var cert = fs.readFileSync('ssl/server.crt')
var FileHandler = require('./app/modules/FileHandler')
var TwitterFeed = require('./app/modules/TwitterFeed')
var options = {
    key: key,
    cert: cert,
    requestCert: false,
    rejectUnauthorized: false,
    passphrase: 'password123'
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

    var userFileHandler = new FileHandler()
    var tweetsFileHandler = new FileHandler()
    var twitterFeed = new TwitterFeed()

    bodyResult = null
    var UserMap = new Map()
    var userPath = 'app/resources/user.txt'
    var tweetsPath = 'app/resources/tweet.txt'
    userFileHandler.setPath(userPath)
    tweetsFileHandler.setPath(tweetsPath)
    // retrieve files once a secure connection has been established
    var openUserRecords = userText => {
        if (typeof userText === 'string') {
            var userRecords = userText.trim().split('\r\n')
            twitterFeed.setUserRecords(userRecords)
                .then(
                    value => {
                        var keys = Object.keys(value)
                        for (var key of keys) {
                            twitterFeed.setUserFollowers(key, value[key])
                        }


                    })
                .catch(
                    reason => {
                        console.error("Error", reason)
                    }
                )
        }

    }
    var openUser = userFileHandler.openFileAsUtf8()
        .then(openUserRecords)
        .catch(e => {
            console.error("ERROR - ", e)
        })

    var openTweetRecords = text => {
        var tweetRecords = text.split('\n')
        twitterFeed.setTweets(tweetRecords)
            .then(value => {
                console.log("Tweets Success", value)
            })
            .catch(
                reason => {
                    console.error("tweets error", value)
                }
            )

    }

    var openTweets = tweetsFileHandler.openFileAsUtf8()
        .then(openTweetRecords)
        .catch(e => {
            console.log(e)
        })



})

httpServer.listen(8080)
httpsServer.listen(8000)

httpsServer.on('listen', () => {
    console.log("NEW SESSION")
})

// open app in defualt browser.
opn('http://localhost:8080')
    .then(process => {
        console.log("Process Spawned", process)
    })
    .catch(reason => {
        console.log('ERROR-', reason)
    })