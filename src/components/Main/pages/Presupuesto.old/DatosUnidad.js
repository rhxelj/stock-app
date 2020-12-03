import React from 'react';

class Bookings extends React.Component {
  state = {
    list: [],
    cantidad: 0,
    detalle: '',
    importeuni: ''
  };

  // Función que captura el valor de los inputs
  // para setearlo en su respectivo estado
  // Para este caso: cantidad, detalle y importeuni
  handleInputChange = event => {
    const { target } = event;
    const { name, value } = target;

    this.setState({
      [name]: value
    });
  };

  // Esta función se ejecutará al momento de darle click al botón de "Agregar"
  handleSubmit = event => {
    const { cantidad, detalle, importeuni, list } = this.state;

    // Simple validación para que cantidad, detalle y importeuni sean campos requeridos
    if (cantidad && detalle && importeuni) {
      const id = list.length + 1;
      // En los states se agrega un nuevo objeto a "list"
      // y se reinicia el estado de cantidad, detalle y importeuni
      this.setState({
        list: [...list, { id, cantidad, detalle, importeuni }],
        cantidad: 0,
        detalle: '',
        importeuni: ''
      });
    } else {
      // Si alguno de los inputs se encuentra vacio
      // se mostrará el siguiente mensaje en la consola del navegador
      console.log('Please complete all fields');
    }

    // Para que no se refresque la página por el onSubmit del formulario
    event.preventDefault();
  };

  render() {
    const { cantidad, detalle, importeuni, list } = this.state;
    return (
      <>
        <div className="inputs_cantidad">
          <form onSubmit={this.handleSubmit} className="form_cantidad">
            <div className="form-group">
              <label htmlFor="cantidad">
                Cantidad:
                <input
                  type="numeric"
                  className="form-control"
                  id="cantidad"
                  name="cantidad"
                  value={cantidad}
                  onChange={this.handleInputChange}
                />
              </label>
            </div>
            <div className="form-group">
              <label htmlFor="detalle">
                Detalle:
                <input
                  type="number"
                  className="form-control"
                  id="detalle"
                  placeholder="#"
                  name="detalle"
                  value={detalle}
                  onChange={this.handleInputChange}
                />
              </label>
            </div>
            <div className="form-group room">
              <label htmlFor="importeuni">
                Precio:
                <input
                  type="number"
                  className="form-control"
                  id="importeuni"
                  placeholder="$"
                  name="importeuni"
                  value={importeuni}
                  onChange={this.handleInputChange}
                />
              </label>
            </div>
            <div className="detalle_btn">
              <button type="submit" className="btn btn-primary">
                Agregar
              </button>
            </div>
          </form>
        </div>
        <div className="table_cantidad">
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">Cantidad</th>
                <th scope="col">Detalle</th>
                <th scope="col">Precio</th>
              </tr>
            </thead>
            <tbody>
              {list.map(item => (
                <tr key={item.id}>
                  <td>{item.cantidad}</td>
                  <td>{item.detalle}</td>
                  <td>{item.importeuni}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    );
  }
}

export default Bookings;