
var listaProductos =
[
    ['01','Camisetas', 'volcom', '19', 'ropa'],
    ['02','Cremas', 'tat', '10','Suministros']
];




function AgregarProducto(){

    //lee los datos ingresados
    var sCedula = document.querySelector('#txtCed').value;
    var sNombre = document.querySelector('#txtNom').value;
    var sMarca = document.querySelector('#txtMarca').value;
    var sCantidad = document.querySelector('#txtCantidad').value;
    var sTipo = document.querySelector('#txtTipo').value;
    
    //valida que todos los datos esten llenos
    if(sCedula== ''|| sNombre == '' || sMarca == '' || sCantidad == '' || sTipo == ''){
        alert('Debe llenar todos los campos');
    }else{
       var aNuevoProducto = [];
       aNuevoProducto.push(sCedula,sNombre, sMarca, sCantidad, sTipo); //agrega los datos al array

       var listaProductos = getListaProductos();
       listaProductos.push(aNuevoProducto);
       localStorage.setItem('listaProductosLS', JSON.stringify(listaProductos));//agrega el array a una variable de sesion
        alert("Producto agregado correctamente");
       CargarTablaProductos();
    }
}




//Obtener Lista de Estudiantes
function getListaProductos(){
    var listaProductosLocal = JSON.parse(localStorage.getItem('listaProductosLS'));

    if(listaProductosLocal == null){
        listaProductosLocal = listaProductos;
    }

    return listaProductosLocal;
}

//Carga la tabla de citas
function CargarTablaProductos(){

    var producto = getListaProductos(),
    tbody = document.querySelector('#tblPersonas tbody');

    tbody.innerHTML = '';

    for (var i = 0; i < producto.length; i++) {
        
        var fila              = document.createElement('tr'),
            celdaCedula       = document.createElement('td'),
            celdaNombre       = document.createElement('td'),
            celdaMarca        = document.createElement('td'),
            celdaCantidad     = document.createElement('td'),
            celdaTipo         = document.createElement('td');
            celdaOpciones     = document.createElement('td');

        var botonEditar           = document.createElement('input');
            botonEditar.type      = 'button';
            botonEditar.style     = 'background-image: url("./img/mod.png"); width:36px; height:36px';
            botonEditar.id        = producto[i][0];
            botonEditar.classList = 'Opciones';
            botonEditar.addEventListener('click', Modal);


        var botonEliminar           = document.createElement('input');
            botonEliminar.type      = 'button';
            botonEliminar.style     ='background-image: url("./img/trash.png"); width:36px; height:36px';
            botonEliminar.id        = producto[i][0];
            botonEliminar.classList = 'Opciones';
            botonEliminar.addEventListener('click', EliminarProducto);

        celdaCedula.innerHTML        = producto[i][0];
        celdaNombre.innerHTML        = producto[i][1];
        celdaMarca.innerHTML         = producto[i][2];
        celdaCantidad.innerHTML      = producto[i][3];
        celdaTipo.innerHTML          = producto[i][4];

        celdaOpciones.appendChild(botonEditar);
        celdaOpciones.appendChild(botonEliminar);

        fila.appendChild(celdaCedula);
        fila.appendChild(celdaNombre);
        fila.appendChild(celdaMarca);
        fila.appendChild(celdaCantidad);
        fila.appendChild(celdaTipo);
        fila.appendChild(celdaOpciones);

        tbody.appendChild(fila);
    }
}

//Eliminar Estudiantes
function EliminarProducto(){
    var producto;
    var listaProductos = getListaProductos();
    
    for (var i = 0; i < listaProductos.length; i++) {
        if (this.id == listaProductos[i][0]) {
            producto = listaProductos[i]; //obtiene los datos del estudiante seleccionado
        }
    }

    var index = listaProductos.indexOf(producto); //obtiene la posición de los datos del estudiante seleccionado

    if (index > -1) {
        listaProductos.splice(index, 1); //elimina al estudiante
    }

    localStorage.setItem('listaProductosLS', JSON.stringify(listaProductos));//agrega el array a una variable de sesion
    alert("Producto eliminado correctamente");
    CargarTablaProductos();
}

//Busca a un estudiante específico
function BuscarProducto(IdProducto){

    var producto;
    var listaProductos = getListaProductos();

    console.log(listaProductos);

    for (var i = 0; i < listaProductos.length; i++) {
        if (IdProducto == listaProductos[i][0]) {
            producto = listaProductos[i]; //obtiene los datos del estudiante seleccionado
        }
    }
    return producto;
}

function Modal(){
    // Get the modal
    var modal = document.getElementById("myModal");

    // Get the button that opens the modal
    var btn  = document.getElementById(this.id);

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks the button, open the modal 
    btn.onclick = function() {
        modal.style.display = "block";
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
    CargarProductos(this.id);
}

function CargarProductos(IdProducto){

    var producto = BuscarProducto(IdProducto);

    document.querySelector('#txtCedMod').value      = producto[0];
    document.querySelector('#txtNomMod').value      = producto[1];
    document.querySelector('#txtMarcaMod').value    = producto[2];
    document.querySelector('#txtCantidadMod').value = producto[3];
    document.querySelector('#txtTipoMod').value     = producto[4];

}

function EditarProducto(IdProducto){
    var productoOriginal;
    var producto = BuscarProducto(IdProducto);

    //lee los datos ingresados
    var sCedula      = document.querySelector('#txtCedMod').value;
    var sNombre      = document.querySelector('#txtNomMod').value;
    var sMarca       = document.querySelector('#txtMarcaMod').value;
    var sCantidad    = document.querySelector('#txtCantidadMod').value;
    var sTipo        = document.querySelector('#txtTipoMod').value;

    if(sCedula==''|| sNombre == '' || sMarca == '' || sCantidad == '' || sTipo == ''){
        alert("Debe llenar todos los campos");
    }else{

        producto[0] = sCedula;
        producto[1] = sNombre;
        producto[2] = sMarca;
        producto[3] = sCantidad;
        producto[4] = sTipo;

        var listaProductos = getListaProductos();
    
        for (var i = 0; i < listaProductos.length; i++) {
            if (IdProducto == listaProductos[i][0]) {
                productoOriginal = listaProductos[i]; //obtiene los datos del estudiante seleccionado
            }
        }
    
        var index = listaProductos.indexOf(productoOriginal); //obtiene la posición de los datos del estudiante seleccionado
    
        if (index > -1) {
            listaProductos[index] = producto; //elimina al estudiante
        }
    
        localStorage.setItem('listaProductosLS', JSON.stringify(listaProductos));//agrega el array a una variable de sesion
    
        var modal = document.getElementById("myModal");
        modal.style.display = "none";
        alert("Producto modificado correctamente");
    }


    

    CargarTablaProductos();    
}