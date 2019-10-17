// import React from "react";

function CodigoError(err) {
    switch(err.status){
        case 409: 
            alert('Código ingresado EXISTENTE  ')
            break
        case 410: 
            alert('El Código excede la cantidad de dígitos permitidos ')
            break
        case 411: 
            alert('Código  Usado no se puede borrar ')
            break
        case 412: 
            alert('El campo numérico es más grande de lo que corresponde ')
            break
        case 413: 
            alert('Faltan datos para ingresar información en tabla')
            break
        case 414: 
            alert('Faltan datos para leer información en tabla')
            break 
           
        default:  
            alert('Error ',err.status)
    }
}
export default CodigoError;


// if (err.status === 409) => 1062 => cuando se da de alta un código existente
// if (err.status === 410) => 1406 => el campo  alfanumérico más grande de lo que corresponde 
// if (err.status === 412) => 1264 => el campo numérico más grande de lo que corresponde
// if (err.status === 411) => 1451 => Código  Usado no se puede borrar 
// if (err.status === 413) => 1366 => Faltan datos para ingresar información en tabla
// if (err.status === 414) => 1054 => Faltan datos para leer información en tabla