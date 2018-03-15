var fs = require('fs')



/**
 * Return the text contained in the file specified in the file path as utf-8 encoded
 * The function runs synchronously for most parts
 */
var openFileAsUtf8 = function () {

    return new Promise((resolve, reject) => {
        if (fs.existsSync(this.path)) {
            try {
                this.text = fs.readFileSync(this.path, 'utf-8')
                resolve(this.text)
            }
            catch (e) {
                reject(e)
            }
        }
    })
}
var getText = function () {
    return this.text
}
var getPath = function () {
    return this.path

}
var setPath = function (path) {
    this.path = path
}

function FileHandler() {
    this.path = null
    this.text = ''
    this.getText = getText
    this.openFileAsUtf8 = openFileAsUtf8
    this.getPath = getPath
    this.setPath = setPath
}

module.exports = FileHandler