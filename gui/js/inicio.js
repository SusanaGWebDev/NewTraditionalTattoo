function IniciarSesion(){

    var sCorreo = '';
    var sContrasena = '';
    var btnAcceso = false;

    sCorreo = document.querySelector('#txtCorreo').value;
    sContrasena = document.querySelector('#txtContraseña').value;

    btnAcceso = validarCredenciales(sCorreo, sContrasena);

    if(btnAcceso == true){
        ingresar();
    }else{
        alert('Credenciales incorrectos');
    }
}

function validarCredenciales(pCorreo, pContrasena) {
    
    var listaUsuarios = obtenerListaUsuarios(); //obtiene la lsita de usuarios iniciales
    var btnAcceso = false;
    
    for (var i = 0; i < listaUsuarios.length; i++) {
        if (pCorreo == listaUsuarios[i][3] && pContrasena == listaUsuarios[i][4]) {//valida las credenciales
            btnAcceso = true;

            //guarda los datos del usuario en variables de sesion
            sessionStorage.setItem('usuarioActivo', listaUsuarios[i][1] + ' ' + listaUsuarios[i][2]);
            sessionStorage.setItem('rolUsuarioActivo', listaUsuarios[i][6]);
        }
    }
    return btnAcceso;
}

//crea los usuarios con los que inicia el sistema por default
function obtenerListaUsuarios() {

    var listaUsuarios = JSON.parse(localStorage.getItem('listUsuariosLs')); //convierte los datos de 'listUsuariosLs' a formato JSON
  
    if (listaUsuarios == null) {
        listaUsuarios = [
          //Cédula, nombre, apellidos, correo, contraseña, fecha nacimiento, rol(1 = admin | 2 = profesor)
          ['3051609872', 'Susana', 'Gonzalez', 'susanagonzalez@gmail.com', '1234', '1999-04-02', '1'],
          ['303330333', 'Gerardo', 'Molina', 'Molina@gmail.com', '1111', '1987-08-13', '2'],
          ['1', '1', '1', '1', '1', '2004-08-17', '1']
        ]
    }
    return listaUsuarios;
}

//valida el rol del usuario que desea ingresar
function ingresar(){

    var rol = sessionStorage.getItem('rolUsuarioActivo');

    switch(rol){
        case '1':
            window.location.href = "PaginaPrincipal.html";
            break;
        case '2':
            window.location.href = "PaginaPrincipal2.html";
            break; 
        default:
            alert("Error al validar rol de usuario"); 
            break;
    }
}