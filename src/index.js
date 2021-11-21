//Imports
require('dotenv').config()
const connection = require('./database')
const express = require('express')
const morgan = require('morgan')
const session = require('express-session')
const MySqlSessionStore = require('express-mysql-session')(session)
const path = require('path')
const flash = require('connect-flash')
const passport = require('passport')
const exphbs = require('express-handlebars')
const sockets = require('./lib/socketio')
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

const sessionConfig = session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  store: new MySqlSessionStore(database)
})
app.use(sessionConfig)


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
app.use('/', require('./routes/auth.routes'))


app.use(require('./routes/systemRoutes/admin.routes'))
app.use(require('./routes/systemRoutes/chef.routes'))
app.use(require('./routes/systemRoutes/waiter.routes'))
app.use(require('./routes/systemRoutes/tradesman.routes'))
app.use(require('./routes/systemRoutes/barman.routes'))
app.use(require('./routes/systemRoutes/api.routes'))
app.use(require('./routes/profile.routes'))
app.use(require('./routes/landinPage.routes'))

//Server port config
let port = 3000 || process.env.PORT
const server = app.listen(port, ()=>{
    console.log(`Listening on port ${port}`)
})

const io = require('socket.io')(server)

const wrap = middleware => (socket, next) => middleware(socket.request, {}, next);
  io.use(wrap(sessionConfig))
  io.use(wrap(passport.initialize()));
  io.use(wrap(passport.session()));
  
    io.on('connection',(socket)=>{
      console.log('nueva conexion')
    let clients = io.sockets;
    clients.sockets.forEach(socket =>{
      console.log(socket.request.user)
    })
    //chef
    //render al chef orders
    socket.on('clientChef:getAllOrders',async()=>{
        const orders = await connection.query(`select ppl.id, m.mesa, ppl.totalpedido, ppl.estatus from pedidolocal ppl, mesas m WHERE m.id = ppl.fk_mesa && estatus = 'Preparacion'`)
        io.emit('server:chefGetAllOrders',orders)
    })
    //send new order to chef from waiter to add to chef orders view
    socket.on('clientWaiter:sendChefNewOrder',async(id)=>{
        console.log(id)
        const orders = await connection.query(`select ppl.id, m.mesa, ppl.totalpedido, ppl.estatus from pedidolocal ppl, mesas m WHERE m.id = ppl.fk_mesa && estatus = 'Preparacion'`)
        io.emit('server:waiterSendOrdersChef',orders, id)
    })
    //chef emits order finished and id of the order
    socket.on('clientChef:OrderFinished',(id)=>{
        io.emit('server:chefOrderFinished',id)
    })

    
    //render al barman orders
    socket.on('clientBarman:getAllOrders',async()=>{
        const orders = await connection.query(`select ppl.id, m.mesa, ppl.totalpedido, ppl.estatus from pedidolocal ppl, mesas m WHERE m.id = ppl.fk_mesa && estatus = 'Preparacion'`)
        io.emit('server:barmanGetAllOrders',orders)
    })
    //send new order to chef from waiter to add to chef orders view
    socket.on('clientWaiter:sendBarmanNewOrder',async(id)=>{
        console.log(id)
        const orders = await connection.query(`select ppl.id, m.mesa, ppl.totalpedido, ppl.estatus from pedidolocal ppl, mesas m WHERE m.id = ppl.fk_mesa && estatus = 'Preparacion'`)
        io.emit('server:waiterSendOrdersBarman',orders, id)
    })
    //chef emits order finished and id of the order
    socket.on('clientBarman:OrderFinished',(id)=>{
        io.emit('server:barmanOrderFinished',id)
    })




    //sockets for test
    //notify to specific client
    socket.on('clientAdmin:notifyClient', ()=>{
      clients.sockets.forEach(socket =>{
        if(socket.request.user.id === 38){
          io.to(socket.id).emit('server:notifyCustomer')
        }
      })
       
    })
    socket.on('clientAdmin:notifyWaiter',()=>{
        io.emit('server:notifyWaiter')
    })
    
    
    //console.log('new connection', socket.id, socket.request.user)
}) 


