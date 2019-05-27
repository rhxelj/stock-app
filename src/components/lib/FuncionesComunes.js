import IpServidor from './VariablesDeEntorno'


//******************************************* Funcion ordernar - Begin *******************************************

    sortBy(key) {
        this.setState({
            monedas: this.state.monedas.sort((a, b) =>
                this.state.direction[key] === "asc" ? (a[key] < b[key] ? 1 : -1) : (a[key] > b[key] ? 1 : -1)
            ),
            direction: { [key]: this.state.direction[key] === "asc" ? "desc" : "asc" }
        });
    }

//******************************************* Funcion ordernar - End *******************************************



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

{/* Muesra los botones Flotantes en la parte inferior de la pantalla Agregar y Busqueda*/}

<StkFab toggleAgregar={this.toggleAgregar} toggleBusqueda={this.toggleBusqueda} toggle_busqueda={this.state.toggle_busqueda} search={this.search} filtered={this.state.filtered} />