const express = require ('express');
const routerCarrito = express.Router();

const Carrito = require ('../api/Carrito')
const carrito = new Carrito();


routerCarrito.get('/carrito/listar', (req, res)=>{
    let respuesta = carrito.listar();
    let comprueboListaVacia = respuesta.length !== 0;
    res.send( { existenProductos: comprueboListaVacia, productos: respuesta })

    // res.render('cartAll', { existenProductos: comprueboListaVacia, productos: respuesta })
})

routerCarrito.get('/carrito/listar/:idcar/:idprod', (req,res)=>{
    let response = carrito.listar_id_prod(req.params.idcar, req.params.idprod);
    res.json(response)
})


routerCarrito.post('/carrito/guardar/:id', (req, res)=>{
    let respuesta = carrito.agregar(req.params.id);
    res.redirect('/');
})

routerCarrito.delete('/carrito/borrar/:idcar', (req, res) => {
    let response = carrito.borrar(req.params.idcar);
    res.json(response);
})

routerCarrito.put('/carrito/actualizar/:id', (req, res)=> {
    let response = carrito.update(req.params.id, req.body);
    res.json(response);
})

module.exports = {routerCarrito, carrito};