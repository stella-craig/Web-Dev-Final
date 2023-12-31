
const express = require('express')
const app = express()
const path = require("path");
const port = 3100
app.use(express.static('public'))





var mysql = require('mysql');


var con = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "MuhogiDatabase123$",
  database: "JIBS"
});

con.connect(function(err) {
  if (err) throw err;
 console.log("Connected!");
});











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

var bigemail = "";
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

var take = "";
app.post("/cart", function(req, res){
    console.log("WE MADE IT");
    var credits = req.body.credits;
    console.log(credits);
    if(take-credits<0){
        res.redirect("/cart")
    }else{
            console.log("WE MADE IT");
        take = take-credits;
        let sql = "UPDATE USER SET Credits = " + take + " WHERE Email = '" + bigemail + "'";
        con.query(sql, (err, result) => {
            if (err) throw err;
            console.log(result);
            res.redirect("/");
        })
        }






    })



app.post("/login", async function(req, res){




    let sql = "SELECT Credits, Password FROM USER WHERE Email = '" + req.body.email + "'";
    con.query(sql, async (err, result) => {
        if (err) throw err;
        if(await bcrypt.compare(req.body.password, result[0].Password)){
            take = result[0].Credits;
            bigemail = req.body.email;
            res.render("shop.ejs", {take : take})
        }else{
            res.redirect("/login?state=0")
        }

        




        return result;
    });
    
    
    


})
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




app.post("/", (req,res)=>{
    res.redirect("/")
})
app.get("/cart", (req, res) => res.render("cart.ejs"))
app.get("/register", (req, res) => res.render("register.ejs"))

/*
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
app.post("/register", async (req, res) => {
    try {
        console.log("RAn");
        console.log(req.body)
 var hash = await bcrypt.hash(req.body.password, 8);

    let sql = "INSERT INTO USER(Email, Password, Credits) VALUES ('" + req.body.email + "', '" + hash + "', 1000)";
    con.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        return result;
    });
    
    res.redirect("/login?state=1")
} catch(error) {
    res.redirect("/login?state=0")
    console.log(error)
}
})




app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`)
});


