const express = require('express')
const app = express()
const mongoose = require('mongoose')
const port = 3000
const url = 'mongodb+srv://SCraig:Password1@jibs-cluster.c84yhzu.mongodb.net/?retryWrites=true&w=majority'

async function myConnect(){
    try{
        await mongoose.connect(url)
        console.log("connected to MongoDB jibs-cluster")
    }catch{
        console.error(error)
    }
}





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




//

if(process.env.NODE_ENV !== "production"){
    require("dotenv").config()
}


const bcrypt = require("bcrypt")
const passport = require("passport")
const flash = require("express-flash")
const session = require("express-session")
const methodOverride = require("method-override")

app.set("view-engine", "ejs")
app.use(express.urlencoded({extended:false}))


app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride("_method"))

users = [
    // Test account.
    // Email: test@jibs.com
    // Password: 123
    {
        id: '1701986192577',
        name: undefined,
        email: 'test@jibs.com',
        password: '$2b$08$3yeRUsjymue.07cPUOXvxu9j/kcxM74GnBH.YQ7PYxO6Ps12a3g5.'
    }
];

app.get('/', (req, res) => res.render('index.ejs', {name: req.user.name}))
app.get("/login", (req, res) => res.render("login.ejs"))
app.post("/login", passport.authenticate('local', {

    successRedirect: "/shop",
    failureRedirect: "/login?state=2",
    failureFlash: true

}))


function checkAuthentication(req, res, next){
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect('/login')
}

function checkNotAuthentication(req, res, next){
    if(req.isAuthenticated()){
        return res.redirect('/')
    }
    next();
}


app.delete("/logout", (req,res) => {
    req.logOut()
    res.redirect("/login")
})

const createPassport = require("./passportConfig")
createPassport(
    passport, 
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id)
)

app.post("/", (req,res)=>{
    res.redirect("/")
})

app.get("/cart", (req, res) => res.render("cart.ejs"))


app.get("/register", (req, res) => res.render("register.ejs"))
app.post("/register", async (req, res) => {
    try {
        console.log(req.body)
    const hashedPassword = await bcrypt.hash(req.body.password, 8)
    users.push({
        id: Date.now().toString(),
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    })
    console.log(users)
    
    res.redirect("/login?state=1")

} catch(error) {
    res.redirect("/login?state=0")
    console.log(error)
}
console.log(users)

})


app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`)
});

