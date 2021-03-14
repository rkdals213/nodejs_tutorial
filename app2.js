const express = require('express')
const bodyParser = require('body-parser')
const app2 = express()
app2.locals.pretty = true
app2.set('view engine', 'jade')
app2.set('views', './views')
app2.use(bodyParser.urlencoded({extended: false}))
app2.use(express.static('public'))

app2.get('/form', function (req, res){
    res.render('form')
})

app2.post('/form_receiver', function (req, res){
    var title = req.body.title
    var description = req.body.description
    res.send(title + "," + description)
})

// app2.get('/form_receiver', function (req, res){
//     var title = req.query.title
//     var description = req.query.description
//     res.send(title + "," + description)
// })

app2.get('/topic/:id', function (req, res){
    var topics = [
        'Javascript is...',
        'Nodejs is...',
        'Express is...'
    ]
    var str =
        `
            <a href="/topic?id=0">JavaScript</a><br>
            <a href="/topic?id=1">Nodejs</a><br>
            <a href="/topic?id=2">Express</a><br>
        `
    var output = str + topics[req.params.id]
    res.send(output)
})

// app2.get('/topic', function (req, res){
//     res.send(req.query.id + ',' + req.query.name)
// })

// app2.get('/topic', function (req, res){
//     var topics = [
//         'Javascript is...',
//         'Nodejs is...',
//         'Express is...'
//     ]
//     var str =
//         `
//             <a href="/topic?id=0">JavaScript</a><br>
//             <a href="/topic?id=1">Nodejs</a><br>
//             <a href="/topic?id=2">Express</a><br>
//         `
//     var output = str + topics[req.query.id]
//     res.send(output)
// })

app2.get('/template', function (req, res){
    res.render('temp', {time:Date(), _title:'Jade'})
})

app2.listen(3000, function () {
    console.log('Connected 3000 port')
})

app2.get('/', function (req, res) {
    res.end('welcome')
})

app2.get('/login', function (req, res) {
    res.end('<h1>login please</h1>')
})

app2.get('/route', function (req, res) {
    res.send('Hello Router, <img src="/capture.png">')
})

app2.get('/dynamic', function (req, res) {
    var lis = ''
    for (let i=0; i<5; i++){
        lis = lis + '<li>coding</li>'
    }
    var time = Date()
    var output =
        `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>Title</title>
        </head>
        <body>
            Hello, Dynamic!
            <ul>
               ${lis}
            </ul>            
            ${time}
        </body>
        </html>
        `
    res.send(output)
})