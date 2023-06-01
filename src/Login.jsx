import React, { useState } from "react";
import Navbar from "./components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = ({ onLogin}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = {
      email,
      password,
    };

    try {
      const response = await fetch("http://localhost:4000/api/auth/login", {
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
        localStorage.setItem('token', data.data.JWT);
        localStorage.setItem("user", JSON.stringify(data.data.user)); // Obtén el ID del usuario del localStorage
        onLogin()
        setTimeout(() => {
          navigate("/admin")
        }, 1500);
        // Mostrar la alerta toast de éxito
        // Realizar acciones adicionales después del inicio de sesión exitoso
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
        <h1>Iniciar sesión</h1>
        <form onSubmit={handleSubmit}>
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

          <button className="btn btn-primary mt-2" type="submit">
            Iniciar sesión
          </button>
        </form>
        <Link className="mt-2 text-lg-center text-body link-underline-light" to="/register">
        <h3>Registrate</h3>
        </Link>


      </div>
      <ToastContainer />
    </>
  );
};

export default Login;