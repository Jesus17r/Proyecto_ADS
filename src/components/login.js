import React from "react";
import { Redirect } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      condition: false,
      usuario: "",
      password: "",
    };
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  validar = () => {
    const { usuario, password } = this.state;

    fetch(`Login?User=${usuario}&password=${password}`)
      .then((response) => response.text())
      .then((responseText) => {
        let ret = responseText.includes("yes");

        if (ret) {
          toast.success("USUARIO VÁLIDO");
          setTimeout(() => {
            this.setState({ condition: true });
          }, 2000);
        } else {
          toast.error("USUARIO NO VÁLIDO");
          this.setState({ usuario: "", password: "" });
        }
      })
      .catch((error) => {
        console.error("Error al intentar la autenticación:", error);
        toast.error("Error en el servidor. Inténtelo de nuevo más tarde.");
        this.setState({ usuario: "", password: "" });
      });
  };

  render() {
    const { condition, usuario, password } = this.state;

    if (condition) {
      return <Redirect to="/Proyecto/home" />;
    }

    return (
      <div className="center-container">
        <div className="name-list">
          <ul>
          <li>Arellano Becerril Jesus Omar/2022630056/5CM1/P5</li>
            <li>Caamal Briseño Diego Alejandro/20141115125/5CM1/P5</li>
            <li>Escobar Gomez Darren Jhosimart/2022630349/5CM1/P5</li>
            <li>PRACTICA #5 Módulo de Login del proyecto</li>
          </ul>
        </div>

        <h1 className="login-title">LOGIN</h1>
        <div className="form-group">
          <label className="form-label label-text" htmlFor="User">
            Usuario
          </label>
          <input
            placeholder="Ingrese el usuario"
            type="text"
            id="User"
            name="usuario"
            className="form-control"
            value={usuario}
            onChange={this.handleChange}
          />
        </div>
        <div className="form-group">
          <label className="form-label label-text" htmlFor="password">
            Password
          </label>
          <input
            placeholder="Ingrese su contraseña"
            type="password"
            id="password"
            name="password"
            className="form-control"
            value={password}
            onChange={this.handleChange}
          />
        </div>
        <button className="btn btn-primary" onClick={this.validar}>
          Submit
        </button>
        <ToastContainer position="top-right" autoClose={1000} />
      </div>
    );
  }
}

export default Login;