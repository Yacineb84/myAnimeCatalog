import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";


/*
Composant qui gère l'authentification.
*/
function Login(props) {
  const [données, setDonnées] = useState([{}]);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  useEffect(() => {
    fetch("/api")
      .then((response) => response.json())
      .then((data) => {
        setDonnées(data);
      });
  }, []);

  async function authentification() {
    const res = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    console.log("codeeeee : " + res.ok);
    if (res.ok) {
      const user = await res.json();
      //construction objet
      if (user.errore === "errore") {
        alert("mot de passe erronée");
      } else {
        const userObject = {
          prenom: user.prenom,
          email: user.email,
          password: user.password,
          preferred: user.preferred,
          lastEpisodes: user.lastEpisode,
        };
        const userJson = JSON.stringify(userObject);
        localStorage.setItem("user", userJson);
        window.location.reload();
      }
    }
   
  }

  const handleSubmit = (a) => {
    a.preventDefault();
    authentification();
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton onClick={props.hide}>
        <Modal.Title id="contained-modal-title-vcenter">LOGIN</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Adresse mail</Form.Label>
            <Form.Control
              type="email"
              placeholder="Inserez votre mail"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Mot de passe</Form.Label>
            <Form.Control
              type="password"
              placeholder="Mot de passe"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </Form.Group>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
            }}
          >
            <Button
              className="mb-4"
              variant="light"
              onClick={() => {
                props.switch("register");
              }}
            >
              Vous n'avez pas un compte ? Inscrivez-vous.
            </Button>
            <Button variant="success" type="submit" onClick={props.hide}>
              Connexion
            </Button>
          </div>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.hide} variant="danger">
          Annuler
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Login;
