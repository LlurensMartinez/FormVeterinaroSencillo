import React, { Component } from 'react';
import './bootstrap.min.css';
import Header from './components/Header';
import NuevaCita from './components/NuevaCita';
import ListaCitas from './components/ListaCitas';

class App extends Component {

  state = {
    citas : []
  }

  //Cuando la app carga
  componentDidMount() {
    const citasLocalStorage = localStorage.getItem('citas');
    if(citasLocalStorage){
      this.setState({
        citas: JSON.parse(citasLocalStorage)
      })
    }
  }

  //Cuando eliminamos o agregamos una nueva cita
  componentDidUpdate() {
    localStorage.setItem('citas', JSON.stringify(this.state.citas))
  }

  // Elimina las citas del state

  eliminarCita = id => {
      // hacer una copia del state
      const citasActuales = [...this.state.citas];

      // Utilizar filter para sacar el element @id del Array
      const citas = citasActuales.filter(cita => cita.id !== id)

      // actualizar el state
      this.setState({
        citas
      })
  }

  crearNuevaCita = datos =>{
      //copiar el state actual this.state.citas <-- datos que bienen por props
      const citas = [...this.state.citas, datos]

      //agregar el nuevo state
      this.setState({
        citas: citas
      })
  }
  render() {
    return (
      <div className="container">
        <Header 
          titulo='Administrador Pacientes Veterinaria'
        />
        <div className="row">
          <div className="col-md-10 mx-auto">
            <NuevaCita 
              crearNuevaCita = {this.crearNuevaCita}
            />
          </div>

          <div className="mt-5 col-md-10 mx-auto">
            <ListaCitas 
              citas = {this.state.citas}
              eliminarCita = {this.eliminarCita}
            />

          </div>
        </div>
      </div>
    );
  }
}

export default App;
