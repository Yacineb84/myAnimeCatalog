import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";

/*
Composant pour le bas de page.
*/
function Footer() {
  return (
    <Navbar bg="light" variant="light"  className="fixed-bottom bg-light text-light text-center mt-5">
      <Container>
        <Navbar.Brand>Mr.Anime</Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default Footer;
