
/**
 * Extends Set class to be able to add arrays to the set
 * @param many typeof array 
 */
Set.prototype.addMany = function (many) {
    if (Array.isArray(many)) {
        for (var item of many) {
            this.add(item)
        }
    }
    else {
        this.add(many)
    }

}

/**
 * Returns the starting and ending position of searchedString within mainstring
 * @param {string} mainsString  The string in which searchedString is contained
 * @param  {string} searchedString The string you wish to get the start and ending postion as well as the lengt
 * return null of the paramaters don't match the requirements
 */
var getPosition = function (mainsString, searchedString) {
    if ((typeof mainsString === 'string') && (typeof searchedString === 'string') && mainsString.includes(searchedString)) {
        var length = searchedString.length
        var startIndex = mainsString.indexOf(searchedString)
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

var setUser = function (user) {
    if (typeof user === 'string') {
        if (!this.userDetail.has(user)) {
            var val = {
                followers: new Set(),
                messages: new Array()
            }
            return this.userDetail.set(user, val)
        }
    }
}
var setUsers = function (users) {

    if (!(typeof users === 'undefined')) {
        if (Array.isArray(users)) {
            for (var eachUser of users) {
                this.setUser(eachUser)
            }
        }
        else {
            this.setUser(eachUser)
        }
    }
}
var setUserFollowers = function (key, followers) {

    if (this.userDetail.has(key)) {
        var pairValue = this.userDetail.get(key)
        pairValue.followers.addMany(followers)
    }
    else {
        var user = this.setUser(key)
        user.get(key).followers.addMany(followers)
    }
    console.log("Followers", followers)
    //Since Followers are also users we set them as well
    this.setUsers(followers)

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
    return new Promise((resolve, reject) => {
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
                                resolve(this.userDetail)
                            }
                            else {
                                var value = this.userDetail.get(userName)
                                value.messages.push(message)
                                resolve(this.userDetail)
                            }
                        }
                    }
                    else {
                        reject("Message malformed: Expected '>' ")
                    }
                }
                else {
                    reject("Expected each tweet to by of type string")
                }
            }
            tweetsRecors.forEach(setMessages)
        }
        else {
            reject('Expected an array')
        }
    })

}

var setUserRecords = function (userRecords) {

    return new Promise((resolve, reject) => {
        var nameToFollowers = {}
        if (Array.isArray(userRecords)) {
            userRecords.forEach(
                user => {
                    if (typeof user === 'string') {
                        var isFollowing = user.includes('follows')
                        if (isFollowing) {
                            var postingIndex = getPosition(user, 'follows')
                            if (postingIndex) {

                                var startIndex = postingIndex.startIndex
                                var endIndex = postingIndex.endIndex
                                var usersName = user.substr(0, startIndex).trim()

                                var followers = user.substring(endIndex, user.length).trim().split(',')
                                var mapper = element => {
                                    return element.trim()
                                }
                                followers = followers.map(mapper)
                                nameToFollowers = Object.assign(nameToFollowers, { [usersName]: followers })

                                resolve(nameToFollowers)
                            }
                        }
                        else {
                            reject('Expected the word "follows" in records')
                        }
                    }
                    else {
                        reject('Expected Records to be of type string')
                    }
                })
        }
    })

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
    this.setUserFollowers = setUserFollowers
    this.setUser = setUser
    this.setUsers = setUsers
}


module.exports = TwitterFeed