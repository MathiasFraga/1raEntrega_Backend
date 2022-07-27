const fs = require('fs');

class Carrito {
    constructor() {
        this.carrito = []
        this.idcar = 1;
    }


    listar() {
        let contenido = fs.readFileSync(__dirname + '/carrito.txt', 'utf-8');
        if (contenido) {
            this.carrito = JSON.parse(contenido);
            return this.carrito;
        } else { throw new Error("No hay contenido") }
    }

    listar_id_prod(idcar, idProd) {
        let cart = this.carrito.find(element => element.idcar === parseInt(idcar));
        if (cart) {
            if (productoExiste) {
                return (cart);
            }
            else { console.log("NO exite este producto") }
        } else {
            return { error: "Carrito no encontrado." };
        }
    }

    agregar(productoAgregar) {
        let contenido = fs.readFileSync(__dirname + '/productos.txt', 'utf-8');
        if (contenido) {
            this.productos = JSON.parse(contenido);
            let productoExiste = this.productos.filter(element => element.id === parseInt(productoAgregar));
            if (productoExiste) {
                let productoenCarrito = {
                    idcar: this.idcar++,
                    timestamp: new Date().toLocaleString(),
                    producto: { ...productoExiste }
                };
                this.carrito.push(productoenCarrito);
                fs.writeFileSync(__dirname + "/carrito.txt", JSON.stringify(this.carrito, null, '\t'));
                return this.carrito;
            } else return { error }
        }
        else { throw new Error("No hay contenido") }

    };

    borrar(idcar) {
        let producto = this.carrito.filter(element => element.idcar === parseInt(idcar));
        if (producto) {
            let carritoEliminado = producto[idcar - 1];
            this.carrito.splice(idcar - 1, 1);
            fs.writeFileSync(__dirname + "/carrito.txt", JSON.stringify(this.carrito, null, '\t'));
            return carritoEliminado;
        } else {
            return { error: "Producto a borrar no encontrado." };
        }
    }
}
module.exports = Carrito;
