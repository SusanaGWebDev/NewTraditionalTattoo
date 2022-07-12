
var listaPersonas =
[
    ['305160872','Susana', 'Gonzalez', '02-04-1999', '10:00','63069007','Admin1'],
    ['302860791','Gerardo', 'Molina', '13-08-1986', '16:00','86109530','Admin']
];




function AgregarPersona(){

    //lee los datos ingresados
    var sCedula = document.querySelector('#txtCed').value;
    var sNombre = document.querySelector('#txtNom').value;
    var sApellidos = document.querySelector('#txtApe').value;
    var sFechaNac = document.querySelector('#txtFechNac').value;
    var sTelefono = document.querySelector('#txtTelefono').value;
    var sRol = document.querySelector('#txtRol').value;
    
    //valida que todos los datos esten llenos
    if(sCedula== ''|| sNombre == '' || sApellidos == '' || sFechaNac == '' || sTelefono == '' || sRol == ''){
        alert('Debe llenar todos los campos');
    }else{
       var aNuevaPersona = [];
       aNuevaPersona.push(sCedula,sNombre, sApellidos, sFechaNac, sTelefono, sRol); //agrega los datos al array

       var listaPersonas = getListaPersonas();
       listaPersonas.push(aNuevaPersona);
       localStorage.setItem('listaPersonasLS', JSON.stringify(listaPersonas));//agrega el array a una variable de sesion
        alert("Persona agregada correctamente");
       CargarTablaPersonas();
    }
}




//Obtener Lista de Personas
function getListaPersonas(){
    var listaPersonasLocal = JSON.parse(localStorage.getItem('listaPersonasLS'));

    if(listaPersonasLocal == null){
        listaPersonasLocal = listaPersonas;
    }

    return listaPersonasLocal;
}

//Carga la tabla de Personas
function CargarTablaPersonas(){

    var persona = getListaPersonas(),
    tbody = document.querySelector('#tblPersonas tbody');

    tbody.innerHTML = '';

    for (var i = 0; i < persona.length; i++) {
        
        var fila              = document.createElement('tr'),
            celdaCedula       = document.createElement('td'),
            celdaNombre       = document.createElement('td'),
            celdaApellidos    = document.createElement('td'),
            celdaFechaNac     = document.createElement('td'),
            celdaTelefono     = document.createElement('td');
            celdaRol          = document.createElement('td');
            celdaOpciones     = document.createElement('td');

        var botonEditar           = document.createElement('input');
            botonEditar.type      = 'button';
            botonEditar.style     = 'background-image: url("./img/mod.png"); width:36px; height:36px';
            botonEditar.id        = persona[i][0];
            botonEditar.classList = 'Opciones';
            botonEditar.addEventListener('click', Modal);


        var botonEliminar           = document.createElement('input');
            botonEliminar.type      = 'button';
            botonEliminar.style     ='background-image: url("./img/trash.png"); width:36px; height:36px';
            botonEliminar.id        = persona[i][0];
            botonEliminar.classList = 'Opciones';
            botonEliminar.addEventListener('click', EliminarPersona);

        celdaCedula.innerHTML        = persona[i][0];
        celdaNombre.innerHTML        = persona[i][1];
        celdaApellidos.innerHTML     = persona[i][2];
        celdaFechaNac.innerHTML      = persona[i][3];
        celdaTelefono.innerHTML      = persona[i][4];
        celdaRol.innerHTML           = persona[i][5];

        celdaOpciones.appendChild(botonEditar);
        celdaOpciones.appendChild(botonEliminar);

        fila.appendChild(celdaCedula);
        fila.appendChild(celdaNombre);
        fila.appendChild(celdaApellidos);
        fila.appendChild(celdaFechaNac);
        fila.appendChild(celdaTelefono);
        fila.appendChild(celdaRol);
        fila.appendChild(celdaOpciones);

        tbody.appendChild(fila);
    }
}

//Eliminar Persona
function EliminarPersona(){
    var persona;
    var listaPersonas = getListaPersonas();
    
    for (var i = 0; i < listaPersonas.length; i++) {
        if (this.id == listaPersonas[i][0]) {
         persona = listaPersonas[i]; //obtiene los datos de la persona seleccionado
        }
    }

    var index = listaPersonas.indexOf(persona); //obtiene la posición de los datos de la persona seleccionado

    if (index > -1) {
        listaPersonas.splice(index, 1); //elimina a la persona
    }

    localStorage.setItem('listaPersonasLS', JSON.stringify(listaPersonas));//agrega el array a una variable de sesion
    alert("Persona eliminada correctamente");
    CargarTablaPersonas();
}

//Busca a una persona específico
function BuscarPersona(IdPersona){

    var persona;
    var ListaPersonas = getListaPersonas();

    console.log(ListaPersonas);

    for (var i = 0; i < ListaPersonas.length; i++) {
        if (IdPersona == ListaPersonas[i][0]) {
            persona = ListaPersonas[i]; //obtiene los datos de la persona seleccionado
        }
    }
    return persona;
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
    CargarPersonas(this.id);
}

function CargarPersonas(IdPersona){

    var persona = BuscarPersona(IdPersona);

    document.querySelector('#txtCedMod').value      = persona[0];
    document.querySelector('#txtNomMod').value      = persona[1];
    document.querySelector('#txtApeMod').value      = persona[2];
    document.querySelector('#txtFechaNacMod').value = persona[3];
    document.querySelector('#txtTelefonoMod').value = persona[4];
    document.querySelector('#txtRolMod').value      = persona[5];

}

function EditarPersona(IdPersona){
    var personaOriginal;
    var persona = BuscarPersona(IdPersona);

    //lee los datos ingresados
    var sCedula      = document.querySelector('#txtCedMod').value;
    var sNombre      = document.querySelector('#txtNomMod').value;
    var sApellidos   = document.querySelector('#txtApeMod').value;
    var sFechaNac   = document.querySelector('#txtFechaNacMod').value;
    var sTelefono    = document.querySelector('#txtTelefonoMod').value;
    var sRol         = document.querySelector('#txtRolMod').value;

    if(sCedula==''|| sNombre == '' || sApellidos == '' || sFechaNac == '' || sTelefono == '' || sRol == ''){
        alert("Debe llenar todos los campos");
    }else{

        persona[0] = sCedula;
        persona[1] = sNombre;
        persona[2] = sApellidos;
        persona[3] = sFechaNac;
        persona[4] = sTelefono;
        persona[5] = sRol;

        var ListaPersonas = getListaPersonas();
    
        for (var i = 0; i < ListaPersonas.length; i++) {
            if (IdPersona == ListaPersonas[i][0]) {
                personaOriginal = ListaPersonas[i]; //obtiene los datos de la persona seleccionado
            }
        }
    
        var index = ListaPersonas.indexOf(personaOriginal); //obtiene la posición de los datos de la persona seleccionado
    
        if (index > -1) {
            ListaPersonas[index] = persona; //elimina a la persona
        }
    
        localStorage.setItem('listaPersonasLS', JSON.stringify(ListaPersonas));//agrega el array a una variable de sesion
    
        var modal = document.getElementById("myModal");
        modal.style.display = "none";
        alert("Persona modificada correctamente");
    }


    

    CargarTablaPersonas();    
}