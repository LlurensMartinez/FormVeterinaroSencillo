import React, { Component } from 'react';
import uuid from 'uuid';
import PropTypes from 'prop-types'

const stateInicial = {
  cita : {
    mascota:'',
    propietario: '',
    fecha: '',
    hora:'',
    sintomas: ''
  },
  error: false
}

class NuevaCita extends Component {

  state = {...stateInicial}

// Cuando el usuario escribe en los inputs
handleChange = e => {
  console.log(`${e.target.name}: ${e.target.value}`);

  // colocamos lo que el usuario escribe en el state
  this.setState({
    cita: {
      // realizamos una copia del state
      ...this.state.cita,
      // reescribimos en el campo en el que estoy
      [e.target.name] : e.target.value
    }
  })
}

//Cuando el usuario envia el formulario

handleSubmit = e => {
  e.preventDefault();

  // extraer los valor del state
  const { mascota, propietario, hora, sintomas, fecha } = this.state.cita 

  // validar que todos los campos esten llenos
  if(mascota === '' || propietario === '' || hora === '' || fecha === '' || sintomas === ''){
    this.setState({
      error: true
    })
  // detener la ejecucion
  return;
  }

  // generar objeto con los datos (id)
  const nuevaCita = {...this.state.cita}
  nuevaCita.id = uuid();

  // agregar la cita al state de App
  this.props.crearNuevaCita(nuevaCita)

  // Colocar en el state el stateInicial
  this.setState({
    ...stateInicial
  })
}
  render() {
    const { error } = this.state
    const {mascota, propietario, sintomas, hora, fecha} = this.state.cita 
    return (

      <div className ="card mt-5 py-5">
          <div className="card-body">
              <h2 className="card-litle text-center mb-5">
                Llena el formulario para crear una nueva cita
              </h2>

              {error ? <div className="alert alert-danger mt-2 mb-5 text-center"> 
              Todos los campos son obligatorios
              </div>: null}

              <form
                onSubmit={this.handleSubmit}
              >
                <div className="form-group row">
                  <label className="col-sm-4 col-lg-2 col-form-label">
                    Nombre Mascota
                  </label>  
                    <div className="col-sm-8 col-lg-10">
                      <input 
                        type="text"
                        className="form-control"
                        placeholder="Nombre Mascota"
                        name="mascota"
                        onChange={this.handleChange}
                        value={mascota}
                        />
                    </div>
                </div>

                    <div className="form-group row">
                      <label className="col-sm-4 col-lg-2 col-form-label">
                        Nombre Dueño
                      </label>  
                        <div className="col-sm-8 col-lg-10">
                          <input 
                            type="text"
                            className="form-control"
                            placeholder="Nombre Dueño Mascota"
                            name="propietario"
                            onChange={this.handleChange}
                            value={propietario}
                            />
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-sm-4 col-lg-2 col-form-label">
                          Fecha
                        </label>  
                          <div className="col-sm-8 col-lg-4">
                            <input 
                              type="date"
                              className="form-control"
                              placeholder="Fecha"
                              name="fecha"
                              onChange={this.handleChange}
                              value={fecha}
                              />
                          </div>
                    
                        <label className="col-sm-4 col-lg-2 col-form-label">
                          Hora
                        </label>  
                          <div className="col-sm-8 col-lg-4">
                            <input 
                              type="time"
                              className="form-control"
                              placeholder="Hora"
                              name="hora"
                              onChange={this.handleChange}
                              value={hora}
                              />
                          </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-sm-4 col-lg-2 col-form-label">
                          Síntomas
                        </label>  
                          <div className="col-sm-8 col-lg-4">
                            <textarea 
                              className="form-control"
                              placeholder="Describe los Síntomas"
                              name="sintomas"
                              onChange={this.handleChange}
                              value={sintomas}
                              >
                              </textarea>
                          </div>
                    </div>

                    <input type="submit" className="py-3 mt-2 btn btn-success btn-block" value="AGREGAR NUEVA CITA"/>

              </form>

          </div>  
      </div>
    );
  }
}

NuevaCita.propTypes = {
  crearNuevaCita : PropTypes.func.isRequired
}

export default NuevaCita;