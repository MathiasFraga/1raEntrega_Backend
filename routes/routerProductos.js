const express = require ('express');
const routerProductos = express.Router();

const Producto = require ('../api/Producto')

const producto = new Producto();

let administrador = true


// routerProductos.get('/productos/listar', (req, res)=>{
//     let respuesta = producto.listar();
//     res.json(respuesta);
// })

routerProductos.get('/productos/listar', (req, res) => {
    let respuesta = producto.listar();
    let comprueboListaVacia = respuesta.length !== 0;
    res.render('productos', { existenProductos: comprueboListaVacia, productos: respuesta })
})

// routerProductos.get('/productos/listar/:id', (req,res)=>{
//     let response = producto.listar_id(req.params.id);
//     res.json(response)
// })

routerProductos.get('/productos/listar/:id', (req, res) => {
        let response = producto.listar_id(req.params.id);
        if (response.id !== undefined){
            res.render('onlyProduct', { onlyAProduct: true, producto: response })
        }
        else{ res.render('onlyProduct', { onlyAProduct: false, producto: response.id })}
})

// routerProductos.post('/productos/guardar', (req, res)=>{
//     let productoAgregar = req.body;
//     let respuesta = producto.agregar(productoAgregar);
//     res.redirect('/');
// })

routerProductos.post('/productos/guardar', (req, res) => {
    if (administrador){
        let productoAgregar = req.body;
        let respuesta = producto.agregar(productoAgregar);
        res.redirect('/');
    }
    else { res.render("noauth") }
})

// routerProductos.delete('/productos/borrar/:id', (req, res) => {
//     let response = producto.borrar(req.params.id);
//     res.json(response);
// })

routerProductos.delete('/productos/borrar/:id', (req, res) => {
    if (administrador){
        let response = producto.borrar(req.params.id);
        res.json(response);
    }
    else { res.render("noauth") }
})


// routerProductos.put('/productos/actualizar/:id', (req, res)=> {
//     let response = producto.update(req.params.id, req.body);
//     res.json(response);
// })

routerProductos.put('/productos/actualizar/:id', (req, res) => {
    if (administrador){ 
        let response = producto.update(req.params.id, req.body);
        res.json(response);
    }
    else { res.render("noauth") }
})

module.exports = {routerProductos, producto};