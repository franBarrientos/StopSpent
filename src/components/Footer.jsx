import React from "react";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import "./custom.css"

export default function Footer() {
  return(
  <>
    <footer className="bg-black mt-5">
      <div className="container">
        <h1 className="text-light text-center">Mis redes sociales</h1>
        <div className="d-flex justify-content-between align-items-center g-5 pb-2">
          <a href="https://www.instagram.com/franbarrientos__/">
            <Image className="filter-invert rounded-2 w-h-25" src="instagram.svg" alt="logo ig" />
          </a>
          <a href="https://github.com/franBarrientos">
            <Image className="filter-invert rounded-2 w-h-25" src="github.svg" alt="logo git" />
          </a>
          <a href="https://www.linkedin.com/in/franco-barrientos/">
            <Image className="filter-invert rounded-2 w-h-25" src="linkedin.svg" alt="logo linkedin" />
          </a>
        </div>
      </div>
    </footer>
  </>)
}
