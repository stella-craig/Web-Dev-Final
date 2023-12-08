const express = require('express')
const app = express()
const port = 3000
const User = require('./mongo.js'); //Imports the User stuff
const mongoose = require('mongoose')
mongoose.set('strictQuery', false); // gets rid of annoying warning

const url = 'mongodb+srv://SCraig:Password1@jibs-cluster.c84yhzu.mongodb.net/?retryWrites=true&w=majority'

/*Idek 
const asyncHandler = require('express-async-handler')
const registerUser = asyncHandler(async(req, res) =>{
    const {email, password} = req.body
    console.log(req.body)
    const user = User.create({
        email,
        password
    })

    if(user){
        res.status(201).json({
            _id: user._id,
            email:user.name,
        })
    }
    res.send('Register User')
})
*/

//Code for connecting to Databse
async function dbConnect(){
    try{
        await mongoose.connect(url)
        console.log("connected to MongoDB jibs-cluster")
    }catch(error){
        console.error('Failed to connect to MongoDB:', error)
    }
}

app.use(express.json());
//app.use(express.urlencoded({extend:true}));

dbConnect(); //Connects to the db

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

users = [];

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
//This is supposed to save the user register, and send it to the DB. It makes the user, it does not send it anywhere
//Comment this out and un-comment the stuff below to restore basic functionality
app.post("/register", async (req, res) => {
    try {
        console.log(req.body)
        const hashedPassword = await bcrypt.hash(req.body.password, 8);

        //Creates the new user
        const user = new User({
            email: req.body.email,
            password: hashedPassword,
            credits: 100
        });

        user.save((err) => {
            if(err) return handleError(err);
        });
        console.log('User Created:', user);

        res.redirect("/login?state=1")

    } catch(error) {
        res.redirect("/login?state=0")
        console.log(error)
    }

});
/*Old code
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
*/

//

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`)
});

