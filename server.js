const express = require('express')
const app = express()
const port = 3000

app.use(express.static('public'))
app.use('/CSS', express.static(__dirname + 'public/CSS'))
app.use('/images', express.static(__dirname + 'public/images'))
// app.use('/views', express.static(__dirname + 'public/views'))

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('LandingPage.ejs')
});

// app.get('/about', (req, res) => {
//     res.render('views/LandingPage.ejs')
// });

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`)
});
