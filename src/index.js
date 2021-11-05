//Imports
const express = require('express')
const morgan = require('morgan')
const path = require('path')
const exphbs = require('express-handlebars')

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
  })
);
app.set("view engine", ".hbs");

//static files (css, html, js, media resources)
app.use(express.static(path.join(__dirname,"public")))

//Middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


//all system render views
app.get('/system',(req, res)=>{
  res.render('system/auth/login')
})
app.get('/admin/dashboard',(req, res)=>{
    res.render('system/admin/dashboard')
})
app.get('/chef/dashboard',(req, res)=>{
  res.render('chef/dashboard')
})
app.get('/barman/dashboard',(req, res)=>{
  res.render('system/barman/dashboard')
})
app.get('/mesero/dashboard',(req, res)=>{
  res.render('system/mesero/dashboard')
})
app.get('/repartidor/dashboard',(req, res)=>{
  res.render('system/repartidor/dashboard')
})


//al client render views
app.get('/login',(req, res)=>{
  res.render('client/auth/login')
})
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