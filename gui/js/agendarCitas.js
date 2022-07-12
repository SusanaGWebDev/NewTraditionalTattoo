
var listaCitas =
[
    ['305160872','Susana', 'Gonzalez', '12-12-2021', '10:00','63069007','Tatuador1'],
    ['302860791','Gerardo', 'Molina', '23-11-2021', '16:00','86109530','Tatuador2']
];




function AgregarCita(){

    //lee los datos ingresados
    var sCedula = document.querySelector('#txtCed').value;
    var sNombre = document.querySelector('#txtNom').value;
    var sApellidos = document.querySelector('#txtApe').value;
    var sFechaCita = document.querySelector('#txtFechCita').value;
    var sHora = document.querySelector('#txtHora').value;
    var sTelefono = document.querySelector('#txtTelef').value;
    var sEncargado = document.querySelector('#txtEncarg').value;
    
    //valida que todos los datos esten llenos
    if(sCedula== ''|| sNombre == '' || sApellidos == '' || sFechaCita == '' || sHora == '' || sTelefono == '' || sEncargado == ''){
        alert('Debe llenar todos los campos');
    }else{
       var aNuevaCita = [];
       aNuevaCita.push(sCedula,sNombre, sApellidos, sFechaCita, sHora, sTelefono, sEncargado); //agrega los datos al array

       var listaCitas = getListaCitas();
       listaCitas.push(aNuevaCita);
       localStorage.setItem('listaCitasLS', JSON.stringify(listaCitas));//agrega el array a una variable de sesion
        alert("Cita agregada correctamente");
       CargarTablaCitas();
    }
}




//Obtener Lista de Citas
function getListaCitas(){
    var listaCitasLocal = JSON.parse(localStorage.getItem('listaCitasLS'));

    if(listaCitasLocal == null){
        listaCitasLocal = listaCitas;
    }

    return listaCitasLocal;
}

//Carga la tabla de citas
function CargarTablaCitas(){

    var citas = getListaCitas(),
    tbody = document.querySelector('#tblPersonas tbody');

    tbody.innerHTML = '';

    for (var i = 0; i < citas.length; i++) {
        
        var fila              = document.createElement('tr'),
            celdaCedula       = document.createElement('td'),
            celdaNombre       = document.createElement('td'),
            celdaApellidos    = document.createElement('td'),
            celdaFechaCita    = document.createElement('td'),
            celdaHoraCita     = document.createElement('td'),
            celdaTelefono     = document.createElement('td');
            celdaEncargado    = document.createElement('td');
            celdaOpciones     = document.createElement('td');

        var botonEditar           = document.createElement('input');
            botonEditar.type      = 'button';
            botonEditar.style     = 'background-image: url("./img/mod.png"); width:36px; height:36px';
            botonEditar.id        = citas[i][0];
            botonEditar.classList = 'Opciones';
            botonEditar.addEventListener('click', Modal)


        var botonEliminar           = document.createElement('input');
            botonEliminar.type      = 'button';
            botonEliminar.style     ='background-image: url("./img/trash.png"); width:36px; height:36px';
            botonEliminar.id        = citas[i][0];
            botonEliminar.classList = 'Opciones';
            botonEliminar.addEventListener('click', EliminarCita);

        celdaCedula.innerHTML        = citas[i][0];
        celdaNombre.innerHTML        = citas[i][1];
        celdaApellidos.innerHTML     = citas[i][2];
        celdaFechaCita.innerHTML     = citas[i][3];
        celdaHoraCita.innerHTML      = citas[i][4];
        celdaTelefono.innerHTML      = citas[i][5];
        celdaEncargado.innerHTML     = citas[i][6];

        celdaOpciones.appendChild(botonEditar);
        celdaOpciones.appendChild(botonEliminar);

        fila.appendChild(celdaCedula);
        fila.appendChild(celdaNombre);
        fila.appendChild(celdaApellidos);
        fila.appendChild(celdaFechaCita);
        fila.appendChild(celdaHoraCita);
        fila.appendChild(celdaTelefono);
        fila.appendChild(celdaEncargado);
        fila.appendChild(celdaOpciones);

        tbody.appendChild(fila);
    }
}

//Eliminar Citas
function EliminarCita(){
    var citas;
    var listaCitas = getListaCitas();
    
    for (var i = 0; i < listaCitas.length; i++) {
        if (this.id == listaCitas[i][0]) {
         citas = listaCitas[i]; //obtiene los datos de la cita seleccionado
        }
    }

    var index = listaCitas.indexOf(citas); //obtiene la posición de los datos de la cita seleccionado

    if (index > -1) {
        listaCitas.splice(index, 1); //elimina la cita
    }

    localStorage.setItem('listaCitasLS', JSON.stringify(listaCitas));//agrega el array a una variable de sesion
    alert("Cita eliminada correctamente");
    CargarTablaCitas();
}

//Busca a un cita específico
function BuscarCita(IdCitas){

    var ListaCitas = getListaCitas();

    console.log(ListaCitas);

    for (var i = 0; i < ListaCitas.length; i++) {
        if (IdCitas == ListaCitas[i][0]) {
            var cita = ListaCitas[i]; //obtiene los datos de la cita seleccionado
        }
    }
    return cita;
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
    CargarCitas(this.id);
}

function CargarCitas(IdCitas){

    var cita = BuscarCita(IdCitas);

    document.querySelector('#txtCedMod').value = cita[0];
    document.querySelector('#txtNomMod').value = cita[1];
    document.querySelector('#txtApeMod').value = cita[2];
    document.querySelector('#txtFechaCitaMod').value = cita[3];
    document.querySelector('#txtHoraCitaMod').value = cita[4];
    document.querySelector('#txtTelefonoMod').value = cita[5];
    document.querySelector('#txtEncargadoMod').value = cita[6];

}

function EditarCita(IdCitas){

    var cita = BuscarCita(IdCitas);

    //lee los datos ingresados
    var sCedula = document.querySelector('#txtCedMod').value;
    var sNombre = document.querySelector('#txtNomMod').value;
    var sApellidos = document.querySelector('#txtApeMod').value;
    var sFechaCita = document.querySelector('#txtFechaCitaMod').value;
    var sHoraCita = document.querySelector('#txtHoraCitaMod').value;
    var sTelefono = document.querySelector('#txtTelefonoMod').value;
    var sEncargado = document.querySelector('#txtEncargadoMod').value;

    if(sCedula==''|| sNombre == '' || sApellidos == '' || sFechaCita == '' || sHoraCita == '' || sTelefono == '' || sEncargado == ''){
        alert("Debe llenar todos los campos");
    }else{

        cita[0] = sCedula;
        cita[1] = sNombre;
        cita[2] = sApellidos;
        cita[3] = sFechaCita;
        cita[4] = sHoraCita;
        cita[5] = sTelefono;
        cita[6] = sEncargado;

        var ListaCitas = getListaCitas();
    
        for (var i = 0; i < ListaCitas.length; i++) {
            if (IdCitas == ListaCitas[i][0]) {
                var citaOriginal = ListaCitas[i]; //obtiene los datos de la cita seleccionado
            }
        }
    
        var index = ListaCitas.indexOf(citaOriginal); //obtiene la posición de los datos de la cita seleccionado
    
        if (index > -1) {
            ListaCitas[index] = cita; //elimina al estudiante
        }
    
        localStorage.setItem('listaCitasLS', JSON.stringify(ListaCitas));//agrega el array a una variable de sesion
    
        var modal = document.getElementById("myModal");
        modal.style.display = "none";
        alert("Cita modificada correctamente");
    }


    

    CargarTablaCitas();    
}