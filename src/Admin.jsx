import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, ListGroup } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Admin() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [salary, setSalary] = useState(user.salary);
  const [expenses, setExpenses] = useState();
  const [categories, setCategories] = useState([]);
  const [expenseCategory, setExpenseCategory] = useState(1);
  const [expenseAmount, setExpenseAmount] = useState(0);
  const [description, setDescription] = useState("");
  const [expenseName, setExpenseName] = useState("");
  const [editingSalary, setEditingSalary] = useState(false);
  const [updatedSalary, setUpdatedSalary] = useState(user.salary);
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      return navigate("/");
    }
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser) {
      setUser(savedUser);
      setExpenses(savedUser.spents); // Actualizar el estado de expenses
    }
  }, []);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `https://stopspent-backend-production.up.railway.app/api/spent/${user.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setExpenses(data.data);

          // Actualizar user.spents en localStorage
          // Actualizar user.spents en localStorage
          const updatedUser = {
            ...user,
            spents: data.data,
          };
          setUser(updatedUser);
          localStorage.setItem("user", JSON.stringify(updatedUser));
        } else {
          throw new Error("error en usseEfect");
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchExpenses();
  }, []);

  useEffect(() => {
    const fetchCategoryAndData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          "https://stopspent-backend-production.up.railway.app/api/spentcategory",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          const categories = await response.json();
          setCategories(categories.data);
        } else {
          // Manejo del error en caso de fallar la solicitud
        }
      } catch (error) {
        // Manejo del error en caso de error de conexión o solicitud
      }
    };

    fetchCategoryAndData();
  }, []);

  const handleEditSalary = () => {
    setEditingSalary(true);
  };
  const handleSaveSalary = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `https://stopspent-backend-production.up.railway.app/api/auth/update/${user.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ salary: updatedSalary }),
        }
      );
      if (response.ok) {
        const updatedUser = { ...user, salary: updatedSalary };
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setSalary(updatedSalary);
        setEditingSalary(false);
        toast.success("Salario actualizado correctamente");
      } else {
        throw new Error("Error en la solicitud");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancelEditSalary = () => {
    setUpdatedSalary(salary);
    setEditingSalary(false);
  };

  const handleAddExpense = async (e) => {
    e.preventDefault();
    const newExpense = {
      categorySpent: expenseCategory,
      name: expenseName,
      precio: expenseAmount,
      user,
      description,
    };
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("https://stopspent-backend-production.up.railway.app/api/spent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newExpense),
      });
      if (response.ok) {
        const updatedExpense = await response.json();
        const updatedExpenses = [...expenses, updatedExpense.data];
        setExpenses(updatedExpenses);
        toast.success(`Gasto ${newExpense.name} agregado correctamente`);
        // Actualizar user.spents en localStorage
        const updatedUser = {
          ...user,
          spents: [...expenses, updatedExpense.data],
        };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setExpenseCategory("");
        setExpenseAmount(0);
        setDescription("");
        setExpenseName("");
      } else {
        throw new Error("Error en la solicitud");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const calculateRemaining = () => {
    const totalExpenses = expenses?.reduce(
      (total, expense) => total + expense?.precio,
      0
    );
    return salary - totalExpenses;
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleDeleteExpense = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`https://stopspent-backend-production.up.railway.app/api/spent/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const updatedExpenses = expenses?.filter(
          (expense) => expense?.id !== id
        );
        setExpenses(updatedExpenses);
        toast.error(`Gasto Eliminado correctamente`);
        const updatedUser = {
          ...user,
          spents: [...expenses, updatedExpenses],
        };
        localStorage.setItem("user", JSON.stringify(updatedUser));
      } else {
        throw new Error("Error en la solicitud");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Container>
        <div className="d-flex justify-content-between  align-items-center">
          <h1 className=" mt-4">Gestión de Gastos</h1>
          <Button
            className="btn-sm h-25 "
            variant="danger"
            onClick={handleLogout}
          >
            Cerrar Sesión
          </Button>
        </div>
        {/* Sección para mostrar el salario mensual */}
        <Row>
          <Col>
            <h2>Salario Mensual</h2>
            {editingSalary ? (
              <Form.Group>
                <Form.Control
                  type="number"
                  value={updatedSalary}
                  onChange={(e) => setUpdatedSalary(e.target.value)}
                />
              </Form.Group>
            ) : (
              <p>Salario: ${salary}</p>
            )}
            {editingSalary ? (
              <div>
                <Button variant="primary" onClick={handleSaveSalary}>
                  Guardar
                </Button>
                <Button
                  variant="secondary"
                  onClick={handleCancelEditSalary}
                  className="ml-2"
                >
                  Cancelar
                </Button>
              </div>
            ) : (
              <Button variant="outline-primary" onClick={handleEditSalary}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-pencil"
                  viewBox="0 0 16 16"
                >
                  <path d="M12.793 3.793a.5.5 0 0 1 0 .708L3.5 13H3a1 1 0 0 1-1-1v-.5a.5.5 0 0 1 .146-.354l9.5-9.5a.5.5 0 0 1 .708 0zm1.414-1.414a2 2 0 0 1 0 2.828l-1.5 1.5a.5.5 0 0 1-.707 0L8 4.207 4.207 8l1.5 1.5a.5.5 0 0 1 0 .707l-1.5 1.5a2 2 0 0 1 2.828 0L12 7.793l3.793 3.793a2 2 0 0 1 0 2.828l-1.5 1.5a.5.5 0 0 1-.707 0L8 11.207l-3.793 3.793a.5.5 0 0 1-.707 0l-1.5-1.5a2 2 0 0 1 0-2.828L4.207 8 .414 4.207a2 2 0 0 1 0-2.828l1.5-1.5a.5.5 0 0 1 .707 0L8 4.793l3.793-3.793a.5.5 0 0 1 .707 0l1.5 1.5z" />
                </svg>
              </Button>
            )}
          </Col>
        </Row>

        {/* Sección para mostrar los gastos */}
        <Row>
          <Col>
            <h2>Gastos</h2>
            <ListGroup>
              {expenses?.map((expense, index) => (
                <ListGroup.Item key={index}>
                  <div className="d-flex justify-content-between">
                    <div>
                      Gasto: {expense?.name} - Total: {expense?.precio} -
                      Descripción: {expense?.description}
                    </div>
                    <Button
                      variant="danger"
                      onClick={() => handleDeleteExpense(expense?.id)}
                    >
                      Eliminar
                    </Button>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
        </Row>

        {/* Formulario para agregar nuevos gastos */}
        <Row>
          <Col>
            <h2>Agregar Gasto</h2>
            <Form onSubmit={handleAddExpense}>
              <Form.Group controlId="expenseCategory">
                <Form.Label>Categoría:</Form.Label>
                <Form.Control
                  as="select"
                  value={expenseCategory}
                  onChange={(e) => setExpenseCategory(Number(e.target.value))}
                >
                  {categories.map((option, index) => (
                    <option key={index} value={option.id}>
                      {option.name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="expenseCategory">
                <Form.Label>Nombre:</Form.Label>
                <Form.Control
                  type="text"
                  value={expenseName}
                  onChange={(e) => setExpenseName(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="expenseAmount">
                <Form.Label>Total:</Form.Label>
                <Form.Control
                  type="number"
                  value={expenseAmount}
                  onChange={(e) => setExpenseAmount(Number(e.target.value))}
                />
              </Form.Group>

              <Form.Group controlId="expenseAmount">
                <Form.Label>Descripcion:</Form.Label>
                <Form.Control
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Form.Group>

              <Button variant="primary" className="mt-2" type="submit">
                Agregar Gasto
              </Button>
            </Form>
          </Col>
        </Row>

        {/* Sección para mostrar el restante del salario */}
        <Row className="mt-3">
          <Col>
            <h2>Restante</h2>
            <p>Restante: ${calculateRemaining()}</p>
          </Col>
        </Row>
      </Container>
      <ToastContainer />
    </>
  );
}
