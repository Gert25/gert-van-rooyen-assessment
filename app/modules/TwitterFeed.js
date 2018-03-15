

var getFeed = function (name) {
    var stringBuilder = ''

    var messages = this.getMessages(name)
    for (var i = 0; i < messages.length; i++) {
        var message = messages[i]
        stringBuilder += "@" + name + ":" + message
    }
    return stringBuilder
}
var getPosition = function (mainsString, searchedString) {
    if ((typeof mainsString === 'string') && (typeof searchedString === 'string')) {
        var length = searchedString.length
        // get the start index of the first occurence of searchString in mainsString
        var startIndex = mainsString.indexOf(searchedString)
        //get the last index of the first occurence of searchString in mainString
        var endIndex = (startIndex) + length

        return {
            startIndex: startIndex,
            endIndex: endIndex,
            length: length
        }
    }
    else {
        return null
    }
}


var getMessages = function (name) {
    var messages = []
    if (this.userDetail.has(name)) {
        var val = this.userDetail.get(name)
        messages = val.messages
    }
    return messages
}
var setTweets = function (tweetsRecors) {
    if (Array.isArray(tweetsRecors)) {

        var setMessages = tweet => {
            if (typeof tweet === 'string') {
                var isMessage = tweet.includes('>')
                if (isMessage) {
                    var positionIndex = getPosition(tweet, '>')
                    if (positionIndex) {
                        var startIndex = positionIndex.startIndex
                        var endIndex = positionIndex.endIndex
                        var userName = tweet.substr(0, startIndex).trim()
                        var message = tweet.substr(endIndex + 1)

                        if (!this.userDetail.has(userName)) {
                            var followerSet = new Set()
                            var tweets = new Array()
                            tweets.push(message)
                            var value = {
                                followers: followerSet,
                                messages: tweets
                            }

                            this.userDetail.set(userName, value)
                        }
                        else {
                            var value = this.userDetail.get(userName)
                            value.messages.push(message)
                        }
                    }
                }

            }
        }
        tweetsRecors.forEach(setMessages)
    }
}

var setUserRecords = function (userRecords) {
    if (Array.isArray(userRecords)) {
        userRecords.forEach(user => {
            if (typeof user === 'string') {
                var isFollowing = user.includes('follows')
                if (isFollowing) {
                    var postingIndex = getPosition(user, 'follows')
                    if (postingIndex) {
                        var startIndex = postingIndex.startIndex
                        var endIndex = postingIndex.endIndex

                        var usersName = user.substr(0, startIndex).trim()
                        var followers = user.substr(endIndex + 1).split(',')

                        if (!this.userDetail.has(usersName)) {

                            var followerSet = new Set()
                            var tweets = new Array()
                            var setFollowers = follower => {
                                var val = {
                                    followers: new Set(),
                                    messages: new Array()
                                }
                                this.userDetail.set(follower.trim(), val)
                                followerSet.add(follower.trim())
                            }
                            setFollowers = setFollowers.bind(this)
                            followers.forEach(setFollowers)
                            var value = {
                                followers: followerSet,
                                messages: tweets
                            }
                            this.userDetail.set(usersName, value)
                        }
                        else {
                            var followerSet = new Set()
                            var tweets = new Array()
                            var userValue = this.userDetail.get(usersName)
                            var setFollowers = function (element) {
                                val = {
                                    followers: new Set(),
                                    messages: new Array()
                                }
                                this.userDetail.set(element.trim(), val)
                                userValue.followers.add(element)
                            }
                            setFollowers = setFollowers.bind(this)
                            followers.forEach(setFollowers)
                        }
                    }
                }
            }
        })
    }
}

var getUsers = function () {
    var users = []
    var forEachUser = function (value, key, map) {
        users.push(key)
    }
    this.userDetail.forEach(forEachUser)
    return users
}
var getFollowers = function (name) {
    var userValue = this.userDetail.get(name)
    var followers = []
    if (userValue) {
        var getFollowers = function (key, val, set) {
            followers.push(key)
        }
        userValue.followers.forEach(getFollowers)
    }
    return followers
}
function TwitterFeed() {
    this.userDetail = new Map()
    this.setUserRecords = setUserRecords
    this.getFollowers = getFollowers
    this.getUsers = getUsers
    this.setTweets = setTweets
    this.getMessages = getMessages
    this.getFeed = getFeed
}


module.exports = TwitterFeed