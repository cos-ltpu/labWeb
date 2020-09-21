const express = require('express')
const app = express()
const port = 3000

const mod = require('./7.js')

app.get('/', (req, res) => {
    res.send('Hello World!')
})


app.get('/api/Familiyamya/lab1/ex7', function (req, res) {
    let arr1 = req.query.arr1
    let arr2 = req.query.arr2
    let arr = mod.merge(arr1, arr2);

    let resArr = '<ul>';
    for (let i = 0; i < arr.length; i++) {
        resArr += arr[i] + ' '
    }
    resArr += '</ul>';
    res.send(resArr);

})

app.get('/api/Familiyamya/lab1/ex17', function (req, res) {
    res.send(("function isObject(obj) {\n" +
        "    if ((typeof obj == \"object\") && obj != null) return true;\n" +
        "    else return false;\n" +
        "}"))
})

app.get('/api/Familiyamya/lab1/ex20', function (req, res) {
    res.send((" function Async(arr) {\n" +
        "    for (let i=0; i!=arr.length; i++) arr[i]().then(result => alert(result), error => alert(error));\n" +
        "} "))
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

