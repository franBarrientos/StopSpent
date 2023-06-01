import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [salary, setSalary] = useState(0);
  const [surname, setSurname] = useState("");
    const navigate = useNavigate()
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleSetSalary = (event) => {
    setSalary(Number(event.target.value));
  };
  const handleSurnameChange = (event) => {
    setSurname(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = {
      email,
      password,
      salary,
      name,
      surname
    };

    try {
      const response = await fetch("https://stopspent-backend-production.up.railway.app/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      // Verificar el estado de la respuesta
      if (response.ok) {
        // La solicitud fue exitosa
        const data = await response.json();
        console.log("Usuario autenticado:", data);
        toast.success("Logueado Correctamente!"); 
        setTimeout(() => {
            navigate("/")
        }, 1500);
      } else {
        // La solicitud falló
        const errorData = await response.json();
        console.log("Error en el inicio de sesión:", errorData);
        toast.error("Error en el inicio de sesión");
        // Realizar acciones adicionales en caso de error en el inicio de sesión
      }
    } catch (error) {
      console.log("Error al enviar la solicitud:", error);
      // Realizar acciones adicionales en caso de error de conexión o solicitud
    }
  };

  return (
    <>
      <Navbar />
      <div className="container bg-gray mt-5">
        <h1>Registrate</h1>
        <form onSubmit={handleSubmit}>
          <label className="form-label" htmlFor="name">
            Nombre:
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={handleNameChange}
            required
            className="form-control"
          />
            <label className="form-label" htmlFor="apellido">
              Apellido:
            </label>
            <input
              type="text"
              id="apellido"
              value={surname}
              onChange={handleSurnameChange}
              required
              className="form-control"
            />
          <label className="form-label" htmlFor="email">
            Email:
          </label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={handleEmailChange}
            required
            className="form-control"
          />

          <label className="form-label" htmlFor="password">
            Contraseña:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            required
            className="form-control"
          />
          <label className="form-label" htmlFor="salary">
            Salario:
          </label>
          <input
            type="number"
            id="salary"
            value={salary}
            onChange={handleSetSalary}
            required
            className="form-control"
          />

          <button className="btn btn-primary mt-2" type="submit">
            Registrarme
          </button>
        </form>
        <Link className="mt-2 text-lg-center text-body link-underline-light" to="/">
        <h3>Iniciar sesión</h3>
        </Link>
      </div>
      <ToastContainer />
    </>
  );
};

export default Register;
