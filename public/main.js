const socket = io.connect();

let administrador = true;

let renderTabla = Handlebars.compile(`<style>
.table td, .table th {
    vertical-align: middle;
}
h1 {
    color: blue;
}
hr {
    background-color: #ddd;
}
.jumbotron {
    min-height: 100vh;
}
</style>

<div class="jumbotron">
<h1>Vista de Productos</h1>
<br>

{{#if hayProductos}} 
    <div class="table-responsive">
        <table class="table table-dark">
            <tr> <th>Nombre</th> <th>Precio</th> <th>Imagen</th></tr>
            {{#each productos}}
                <tr> <td>{{this.title}}</td> <td>$ {{this.price}}</td> <td><img width="50" src={{this.thumbnail}} alt="not found"></td> 
                <td>
                <a class="btn btn-sm btn-info" href="/api/productos/listar/{{this.id}}"> VER PRODUCTO </a></td>
                </tr>
            {{/each}}
        </table>
    </div>
{{else}}  
    <h3 class="alert alert-warning">No se encontraron productos</h3>
{{/if}}
</div>`);


socket.on('content', ({ hayProductos, productos }) => {
    let contenido = renderTabla({ hayProductos, productos });
    document.querySelector("#tablaDinamica").innerHTML = contenido;
});

////////////////////////////////////////////////////////////////////
document.querySelector('#cargaFormulario').addEventListener('submit', (e) => {
    e.preventDefault();

    if (administrador) {
        const nombre = document.querySelector("#name").value;
        const descripcion = document.querySelector("#descripcion").value;
        const codigo = document.querySelector("#codigo").value;
        const stock = document.querySelector("#stock").value;
        const price = document.querySelector("#price").value;
        const thumb = document.querySelector("#thumb").files[0].name;
        objeto = { title: nombre, descripcion: descripcion, codigo: codigo, stock: stock, price: price, thumbnail: thumb };

        fetch('/api/productos/guardar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(objeto)
        })
            .then(() => socket.emit("contentSent"))
            .catch((e) => console.log("error: ", e));
    }
    else { alert("NO ESTAS AUTORIZADO A INGRESAR PRODUCTOS") }
})


////////////////////////////////////////////////////////////////////

// socket.on('messages', (data)=> {
//     render(data);
// })

// function render(data) {
//     var html = data.map((elem, index) => {
//         return (`<div>
//             <strong class='styloMail' >${elem.author}</strong>
//             <span class='styloFecha'>[${elem.date}]</span>
//             <p class="styloP">${elem.text}</p>
//             </div>
//         `);
//     }).join(" ");

//     document.getElementById("messages").innerHTML = html;
// }

// document.querySelector('#formulario').addEventListener('submit', (e)=>{
//     e.preventDefault();
//     fecha = (new Date()).toLocaleString();
//     var mensaje = {
//         author: document.getElementById('usermail').value,
//         text: document.getElementById('texto').value,
//         date: fecha
//     };
//     socket.emit('new-message', mensaje);
//     document.getElementById('texto').value = '';
//     document.getElementById('texto').focus();
//     return false;
// })
