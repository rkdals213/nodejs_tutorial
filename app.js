const express = require('express')
const app = express()
const fs = require('fs')
app.locals.pretty = true
app.set('view engine', 'jade')
app.set('views', './views_file')
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static('public'))

app.get('/topic/new', function (req, res) {
    res.render('new')
})

app.post('/topic', function (req, res) {
    const title = req.body.title
    const description = req.body.description
    fs.writeFile('data/' + title, description, function (err) {
        if (err) {
            res.status(500).send('Internal Server Error')
        }
        res.send('Success')
    })
})

app.get('/topic', function (req, res) {
    fs.readdir('data', function (err, files){
        if(err) {
            res.status(500).send('Internal Server Error')
        }
        res.render('view', {topics:files})
    })
})

app.get('/topic/:id', function (req, res) {
    const id = req.params.id
    fs.readdir('data', function (err, files){
        if(err) {
            res.status(500).send('Internal Server Error')
        }
        fs.readFile('data/'+id, 'utf-8', function (err, data){
            if(err) {
                res.status(500).send('Internal Server Error')
            }
            res.render('view', {title:id, topics:files, description:data})
        })
    })
})

app.listen(3000, function () {
    console.log('Connected, 3000 Port')
})