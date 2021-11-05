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
    partialsDir: path.join(app.get("views"), "partials"),
    extname: ".hbs",
  })
);
app.set("view engine", ".hbs");

//Middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.get('/',(req, res)=>{
    res.render('index')
})

//Server port config
let port = 3000 || process.env.PORT
app.listen(port, ()=>{
    console.log(`Listening on port ${port}`)
})