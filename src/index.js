//Imports
require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const session = require('express-session')
const MySqlSessionStore = require('express-mysql-session')(session)
const path = require('path')
const flash = require('connect-flash')
const passport = require('passport')
const exphbs = require('express-handlebars')
require('./lib/passport')
const { database } = require('./config/keys')



//initializations
const app = express()


//CONFIG
app.set("views",path.join(__dirname, "views"))
app.engine(".hbs",
  exphbs({
    defaultLayout: "main",
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "components"),
    extname: ".hbs",
    helpers: require('./helpers/handlebars')
  })
);
app.set("view engine", ".hbs");

//Middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  store: new MySqlSessionStore(database)
}))


app.use(flash())
app.use(passport.initialize())
app.use(passport.session())

//global variables for messages
app.use((req, res, next) => {
  app.locals.success_msg = req.flash("success_msg")
  app.locals.error_msg = req.flash("error_msg")
  app.locals.error = req.flash("error")
   //global variable for get the user
   app.locals.user = req.user || null
   next()
 })

 //static files (css, html, js, media resources)
app.use(express.static(path.join(__dirname,"public")))

app.use('/',require('./routes/clientRoutes/client.routes'))



app.use('/',require('./routes/systemRoutes/auth.routes'))
app.use('/',require('./routes/systemRoutes/admin.routes'))
app.use('/',require('./routes/systemRoutes/chef.routes'))
app.use('/',require('./routes/systemRoutes/waiter.routes'))
app.use('/',require('./routes/systemRoutes/tradesman.routes'))
app.use('/',require('./routes/systemRoutes/barman.routes'))
app.use('/',require('./routes/systemRoutes/api.routes'))


app.get('/signup',(req, res)=>{
  res.render('client/auth/signup')
})

app.get('/client/profile',(req, res)=>{
  res.render('client/profile')
})
app.get('/client/dashboard',(req, res)=>{
  res.render('client/dashboard')
})

//lading page (initial page)
app.get('/',(req, res)=>{
  res.render('index')
})


//Server port config
let port = 3000 || process.env.PORT
app.listen(port, ()=>{
    console.log(`Listening on port ${port}`)
})