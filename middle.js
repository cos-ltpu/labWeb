const fs = require('fs');

module.exports.authMiddle = function authMiddle(req, res, next) {
    if (req.query.auth) next()
    else {
    //res.render("auth.hbs")
    next(new Error('NoLogin'))}
}

module.exports.logToConsoleMiddle = function logToConsoleMiddle(request, response, next) {
    let now = new Date()
    let hour = now.getHours()
    let minutes = now.getMinutes()
    let seconds = now.getSeconds()
    let data = `${hour}:${minutes}:${seconds} ${request.method} ${request.url} }`
    console.log(data)
    next()
}

module.exports.logToFileMiddle = function logToFileMiddle(err, request, response, next) {
    let now = new Date()
    let hour = now.getHours()
    let minutes = now.getMinutes()
    let seconds = now.getSeconds()

        if (err.message == 'NoObject') {
            response.statusCode = 409
        }
        else if (err.message == 'NoLogin') {
            response.statusCode = 401
        }

    let data = `${hour}:${minutes}:${seconds} ${response.statusCode} ${request.url} `

    fs.appendFileSync('errorLog.txt', data + '\n')

    next(err)
}


