const express = require('express')
const exphbs = require('express-handlebars')
const todoRoutes = require('./routes/todos')

const app = express()
const hbs = exphbs.create({
        defaultLayout: 'main',
        extname: 'hbs'
    })


app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views','views')

const mongoose = require('mongoose')

//app.use(express.urlencoded({extended: false}))

app.use(todoRoutes)

const port = 3000

async function start(){
    try {
        /*await mongoose.connect('mongodb+srv://ubuntu:ubuntu@cluster0.d2w01.mongodb.net/todos',{
            useNewUrlParser: true,
            useFindAndModify: false
        })
        const db = mongoose.connection
        db.once('eopen', () => console.log('Connected to Mongoose'))*/

        app.listen(port, () => {
            console.log(`Example app listening at http://localhost:${port}`)
        })
    } catch (e) {
    console.log(e)}
}

start();




