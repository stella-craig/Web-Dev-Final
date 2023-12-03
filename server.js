const express = require('express')
const app = express()
const path = require("path");
const port = 3000

app.use(express.static('public'))
//app.use('/CSS', express.static(__dirname + '/public/CSS'))
app.use('/media', express.static(__dirname + '/public/media'))
app.use('/views', express.static(__dirname + '/views'))

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index.ejs')
});

app.get('/login', (req, res) => {
    res.render('login.ejs')
});

//temporary. currently anyone is allowed to access the shop at /shop.
//intended for now. should be fixed l8r.
app.get('/shop', (req, res) => {
    res.render('shop.ejs')
})

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`)
});
