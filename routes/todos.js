const { Router } = require('express')
const router  = Router()

const mod7 = require('../7.js')
const mod17 = require('../17.js')
const modlog = require('../middle.js')


const bcrypt = require('bcrypt')
const passport = require('passport')
const cookieParser = require('cookie-parser')

const Strategy = require('../passport.js')
const User = require('../user')

Strategy.Strategy(passport, User, req => {req.cookies.token()})

const authenticate = passport.authenticate('cookie', {session: false})

router.use(cookieParser())

router.get('/login', (req, res) => {
    res.render('login')
})

router.get('/register', (req, res) => {
    res.render('register')
})

router.get('/logout', (req, res) => {
    User.findOneAndUpdate({email: req.body.email},  {token: req.cookies.token})
    res.render('login')
})

router.post('/login', async (req, res, next) => {

    try {
        await User.findOne({email: req.body.email}, async (err, newUser) => {

            if (!newUser) {
                res.render('register', {message : 'Пользователь с такой почтой не существует. Пройдите регистрацию'})
            }

                const ValidPassword = bcrypt.compareSync(req.body.password, newUser.password)

                if (ValidPassword) {
                    let token = newUser.token
                    res.cookie('token', token, {maxAge : 3600 * 30, path : '/', secure : false})
                    res.redirect('/')}
                else
                    res.render('login', {message: 'Пароль неверный'})

            })
    } catch (err) {
        next(err)
    }
})

router.post('/register', async (req, res, next) => {

    try {

        const HashedPassward = await bcrypt.hash(req.body.password, 10)

        if (await User.findOne({email: req.body.email})) res.render('register', {message: 'Пользователь с такой почтой уже существует'})
        else {
            let date = new Date()
            let token = await date.getSeconds()
            res.cookie('token', token, {maxAge: 3600 * 30, path: '/', secure: false})

            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: HashedPassward,
                token: token
            })

            newUser.save(function (err) {
                //res.redirect(303, '/register');
                return next(err)
            })
            res.redirect(303, '/login')

        }
    }
    catch (err) {
        next(err)
    }

})

router.use(modlog.logToConsoleMiddle);

router.get('/', authenticate, (req, res) => {
    res.render('index')
})

router.get('/api/ChigazhovaOlga/lab1/ex7', authenticate, (req, res) => {
    res.render('task',{number7:true})
})

router.get('/api/ChigazhovaOlga/lab1/ex17',  authenticate, (req, res) => {
    res.render('task',{number17:true})
})

router.get('/api/ChigazhovaOlga/lab1/ex20', authenticate, (req, res) => {
    res.render('task',{number20:true})
})

router.get('/api/ChigazhovaOlga/lab1/ex7/solution', authenticate, (req, res, next) => {
    let resArr = []
    if (!(req.query.arrF && req.query.arrS)) {next(new Error('NoObject'));}

    let arrF = req.query.arrF
    let arrS = req.query.arrS

    let arr1 = arrF.split(' ')
    let arr2 = arrS.split(' ')

    let arr = mod7.merge(arr1, arr2);
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === ",") arr.splice(i, 1)
    }

    for (let i = 0; i < arr.length; i++) {
        resArr += arr[i] + ' '
    }

    res.render('solution',{result:resArr})
})

router.get('/api/ChigazhovaOlga/lab1/ex17/solution', authenticate, (req, res, next) => {
    let rez = ""
    if (req.query.obj) {rez = mod17.isObject(req.query.obj)}
    else next(new Error('NoObject'))
    res.render('solution',{result:rez})
})

router.get('/api/ChigazhovaOlga/lab1/ex20/solution', authenticate, (req, res) => {
    res.render('solution',{result:"module.exports.Sync = async function Async(arr,str)" +
            "    for (let i = 0; i < arr.length; i++){" +
            "        let p = new Promise( (resolve, reject ) => {" +
            "            arr[i](str)" +
            "            resolve(i+1)"+
            "        });"+
            "        const promisValue = await p;" +
            "        console.log(\"Step\", promisValue)" +
            ""+
            "    }" +
            "" +
            "    return str"+
            "}"})
})

router.use(modlog.logToFileMiddle);

module.exports = router