### Cosas a agregar para la funcion de Busqueda

```javascript
// Funcion De Busqueda - Begin

search = event => {
  // Funcion de busqueda
  // var name  = event.target.name
  var value =
    event.target.type === "checkbox"
      ? event.target.checked
      : event.target.value;
  this.setState({ filtered: value });
};

// Funcion De Busqueda - End.

// Cosas a agregar para la funcion de Busqueda End *************************************************************************************************************
```

### Opción para borrar contenido del cuadro de busqueda

```JavaScript
   // Opcion para borrar contenido del cuadro de busqueda - BEGIN

        borraFiltered = ()=> {
            this.setState({ filtered: '' })
        }

    // Opcion para borrar contenido del cuadro de busqueda - END

```

### Esto se agrega dentro de la función render

```JavaScript
//  Esto se agrega dentro de la funcion render

    // Filtrado de datos - Begin

        var filtrado = this.state.monedas.filter((moneda) => {
            return (
                moneda.idStkMonedas.toLowerCase().indexOf(this.state.filtered.toLowerCase()) !== -1 ||
                moneda.StkMonedasDescripcion.toLowerCase().indexOf(this.state.filtered.toLowerCase()) !== -1
            )
        })
    // Filtrado de datos - End
```
