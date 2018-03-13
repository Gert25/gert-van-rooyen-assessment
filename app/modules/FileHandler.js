var fs = require('fs')

/**
 * Return the text contained in the file specified in the file path
 * The function runs synchronously 
 */
var openFile = function () {
    var fileResult = null

    if (fs.existsSync(this.path)) {
        try {
            fileResult = fs.readFileSync(this.path, 'utf-8')
        }
        catch (e) {
            console.error("OPEN FILE ERROR -", e)
        }
    }
    return fileResult
}
var getPath = function () {
    return this.path
}
var setPath = function (path) {
    this.path = path
}

function FileHandler() {
    this.path = null
    this.text = null
    this.openFile = openFile
    this.getPath = getPath
    this.setPath = setPath
}

module.exports = FileHandler