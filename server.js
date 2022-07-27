const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const {engine} = require('express-handlebars');
const {routerProductos, producto} = require('./routes/routerProductos');
const {routerCarrito} = require('./routes/routerCarrito');
// let { config } = require("./config");
// const PORT = config.port;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

const PORT = 8080;

///////////////////////////////////////////////////////////////
app.engine(
    "handlebars",
    engine({
        extname: ".hbs",
        defaultLayout: 'index.hbs',
        partialsDir: __dirname + '/views/partials/'
    })
);

app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

app.use('/api', routerProductos);
app.use('/api', routerCarrito);
// const Mensajes = require('./api/Mensajes');

// const mensajes = new Mensajes;

app.get('/', (req,res)=>{
    res.sendFile('index');
})

app.use ((req, res, next) => {
    res.status(404).render("errorPage")
})

io.on('connection', socket => {
    console.log('Un cliente se ha conectado en Server.js');
    // let contenido = mensajes.leerMensajes();
    let comprobacion = (producto.productos.length !== 0);
  
    socket.emit('content', {
        hayProductos: comprobacion,
        productos: producto.productos
    })
    socket.emit('contentModify', {
        hayProductos: comprobacion,
        productos: producto.productos
    })

    // socket.emit('messages', contenido)

    socket.on('contentSent', ()=> {
        let comprobacion = producto.productos.length !== 0
        io.sockets.emit('content', {
            hayProductos: comprobacion,
            productos: producto.productos
        })
        io.sockets.emit('contentModify', {
            hayProductos: comprobacion,
            productos: producto.productos
        })
    })
    // socket.on('new-message', function (data) {
    //     mensajes.guardarMensajes(data);
    //     io.sockets.emit('messages', mensajes.leerMensajes());
    // });
});

server.listen(8080, () => {
    console.log('Servidor escuchando en http://localhost:8080');
});

// app.listen(PORT, err=>{
//     console.log(`Server on http://localhost:${PORT}`);
// })
