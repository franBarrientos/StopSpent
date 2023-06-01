import { Container, Row, Col, Image, Button } from "react-bootstrap";
import Navbar from "./components/Navbar";
import Footer from './components/Footer'
const AboutMe = () => {
    const handleButtonClick = () => {
        window.location.href = "https://drive.google.com/file/d/1R_7KBJvhx4kZn2BjD00Wnx7sj0ioBqnk/view?usp=drive_link";
      };
    

    return (
    <>
      <Navbar />
      <Container>
        <Row>
          <Col xs={12} md={6}>
            <Image className="img-thumbnail" src="me.jpg" roundedCircle />
          </Col>
          <Col xs={12} md={6}>
            <h2 className="mt-xl-5"> Acerca de mí</h2>
            <p className="text-lg-center mt-xl-5">
              Estudiante de Licenciatura en sistemas de informacion en la
              Universidad Nacional del Nordeste, Mi gran pasión en esta vida es la programación, Soy
              una persona con muchas ganas de aprender todo lo necesario para
              ser un gran profesional en el area y además afrontar emocionantes
              desafíos que el gran mundo IT tiene para darme.
            </p>
          </Col>
        <Button variant="primary" onClick={handleButtonClick}>
        Ver CV
      </Button>
        </Row>
      </Container>
      <Footer/>
    </>
  );
};

export default AboutMe;
