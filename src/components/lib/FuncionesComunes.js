import IpServidor from './VariablesDeEntorno'



// Cosas a agregar para la funcion de Busqueda Begin **************************************************************************************************

    // Funcion De Busqueda - Begin

        search = (event) => {                       // Funcion de busqueda
            // var name  = event.target.name
            var value = (event.target.type === 'checkbox') ? event.target.checked : event.target.value
            this.setState({ filtered: value })
        }

    // Funcion De Busqueda - End.

    //  Esto se agrega dentro de la funcion render 

    // Filtrado de datos - Begin 

        var filtrado = this.state.monedas.filter((moneda) => {
            return (
                moneda.idStkMonedas.toLowerCase().indexOf(this.state.filtered.toLowerCase()) !== -1 ||
                moneda.StkMonedasDescripcion.toLowerCase().indexOf(this.state.filtered.toLowerCase()) !== -1
            )
        })
    // Filtrado de datos - End  

// Cosas a agregar para la funcion de Busqueda End *************************************************************************************************************






// Cosas a agregar para la funcion de Ordenar (SortBy) Begin ***************************************************************************************************

    // Funcion ordernar - Begin 

        sortBy(key) {
            this.setState({
                monedas: this.state.monedas.sort((a, b) =>
                    this.state.direction[key] === "asc" ? (a[key] < b[key] ? 1 : -1) : (a[key] > b[key] ? 1 : -1)
                ),
                direction: { [key]: this.state.direction[key] === "asc" ? "desc" : "asc" }
            });
        }

    // Funcion ordernar - End 


// Cosas a agregar para la funcion de Ordenar (SortBy) End ******************************************************************************************************




// Cosas a agregar para el Fab(Floating Action Button)

// Agregarlo en la parte supuerior

import StkFab from '../../lib/StkFab'

this.state = {
   
    toggle_agregar: false,
    toggle_busqueda: false,
    toggle_modificar: false,
}

// Agregarlo después de los estados antes de la función render

//******************************************* Habilita el contenido a mostrar en Pantalla - Begin *******************************************

    toggleAgregar = () =>{            
        this.setState(prevState => ({
            toggle_agregar: !prevState.toggle_agregar
        })) // estado inicial "FALSE" muestra la tabla de "monedas"  en "TRUE" llama al componente *** <AgregarMonedas> ***
    }

    toggleModificar = () =>{          
        this.setState(prevState => ({
            toggle_modificar: !prevState.toggle_modificar
        })) // estado inicial "FALSE" no muestra nada  en "TRUE" llama al componente  *** <ModificarMonedas> ***  
    }

    toggleBusqueda = () => {
        this.setState(prevState => ({
            toggle_busqueda: !prevState.toggle_busqueda
        }))
    }

//******************************************* Habilita el contenido a mostrar en Pantalla - End *******************************************


// Agregarlo al final de la tabla

// FAB BEGIN 

    {/* Muesra los botones Flotantes en la parte inferior de la pantalla Agregar y Busqueda*/}

    <StkFab toggleAgregar={this.toggleAgregar} toggleBusqueda={this.toggleBusqueda} toggle_busqueda={this.state.toggle_busqueda} search={this.search} filtered={this.state.filtered} />

// FAB END