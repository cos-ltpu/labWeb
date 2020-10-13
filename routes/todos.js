const { Router } = require('express')
const router  = Router()

let ar = [
    async (str) => {
        setTimeout(()=> {console.log("A"); str += " A"}, 5000 )
        return (1)
    },
    async (str) => {
        setTimeout(()=> {console.log("B"); str += " B"}, 2000 )
        return (2)
    },
    async (str) => {
        setTimeout(()=> {console.log("C"); str += " A"}, 3000 )
        return(3)
}]

const mod7 = require('../7.js')
const mod17 = require('../17.js')
const mod20 = require('../20.js')
const modlog = require('../middle.js')


router.use(modlog.logToConsoleMiddle);

router.get('/', (req, res) => {
    res.render('index')
})

router.get('/api/ChigazhovaOlga/lab1/ex7', (req, res) => {
    res.render('task',{number7:true})
})

router.get('/api/ChigazhovaOlga/lab1/ex17',  (req, res) => {
    res.render('task',{number17:true})
})

router.get('/api/ChigazhovaOlga/lab1/ex20', (req, res) => {
    res.render('task',{number20:true})
})

router.get('/api/ChigazhovaOlga/lab1/ex7/solution', (req, res, next) => {
    let resArr = []
    if (!(req.query.arrF && req.query.arrS)) {next(new Error('NoObject'));}

    let arrF = req.query.arrF
    let arrS = req.query.arrS

    console.log(req.query.name)

    let arr1 = arrF.split(' ')
    let arr2 = arrS.split(' ')


    let arr = mod7.merge(arr1, arr2);
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] == ",") arr.splice(i, 1)
    }

    for (let i = 0; i < arr.length; i++) {
        resArr += arr[i] + ' '
    }

    res.render('solution',{result:resArr})
})

router.get('/api/ChigazhovaOlga/lab1/ex17/solution', modlog.authMiddle,(req, res, next) => {
    let rez = ""
    if (req.query.obj) {rez = mod17.isObject(req.query.obj)}
    else next(new Error('NoObject'))
    res.render('solution',{result:rez})
})

router.get('/api/ChigazhovaOlga/lab1/ex20/solution', modlog.authMiddle,(req, res) => {
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