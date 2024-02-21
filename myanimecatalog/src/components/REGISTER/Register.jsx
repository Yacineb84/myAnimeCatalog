import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

/*
Composant pour l'inscription.
*/
function Register(props) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [prenom, setPrenom] = useState();

  async function registration() {
    const res = await fetch('/registration', 
    {
      method:'POST',
      headers: {
        "Content-Type": 'application/json'
      },
      body: JSON.stringify({
        prenom: prenom,
        email: email,
        password: password
      })
    })
    console.log(res);
  }

  const handleSubmit = (a) => {
    a.preventDefault();
    registration();
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton onClick={props.hide}>
        <Modal.Title id="contained-modal-title-vcenter">S'INSCRIRE</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicPrenom">
            <Form.Label>Nom utilisateur</Form.Label>
            <Form.Control type="text" placeholder="Inserez votre prénom" onChange={e => {setPrenom(e.target.value);}}/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Adresse mail</Form.Label>
            <Form.Control type="email" placeholder="Inserez votre mail" onChange={e => {setEmail(e.target.value);}}/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Mot de passe</Form.Label>
            <Form.Control type="password" placeholder="Mot de passe" onChange={e => {setPassword(e.target.value);}}/>
          </Form.Group>

          {/*<Form.Group className="mb-3" controlId="formBasicPassword2">
            <Form.Label>Retapez le mot de passe</Form.Label>
            <Form.Control type="password" placeholder="Mot de passe" />
            </Form.Group>*/}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Button
            className="mb-4"
              variant="light"
              onClick={() => {
                props.switch("login");
              }}
            >
              Se connecter
            </Button>
            <Button variant="success" type="submit" onClick={props.hide}>
              Envoyer
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

export default Register;
