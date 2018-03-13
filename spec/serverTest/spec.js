var fs = require('fs')
var fileHander = require('../../app/modules/FileHandler')
var pathToUsers = __dirname + '/../../app/resources/user.txt'
var pathToTweets = __dirname + '/../../app/resources/tweet.txt'
describe('Testing Suite', () => {
    console.log("Dir", __dirname)

    describe('test if files exist', () => {
        it('test if users.txt exist', () => {
            expect(fs.existsSync(pathToUsers)).toBe(true)
        })
        it('test if Tweets text exist', () => {
            expect(fs.existsSync(pathToTweets)).toBe(true)
        })

        describe('Opening Files With File Handler:', () => {
            beforeAll(() => {
                this.userFileHandler = new fileHander()
                this.userFileHandler.setPath(pathToUsers)
                this.fileOutput = null
            })

            it('Test if filehandler constructr', () => {
                expect(this.userFileHandler).toBeDefined(true)
            })

            it('test if file path is assigned', () => {
                expect(this.userFileHandler.getPath()).toBe(pathToUsers)
            })

            it('opening file ', () => {
                this.fileOutput = this.userFileHandler.openFile()
                expect(this.fileOutput).toBeDefined()
            })

        })
    })



})