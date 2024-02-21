import React, {  useState } from "react";
import Navbar from "../NAVBAR/Navbar";
import Bloc from "../BLOC/Bloc";
import { Button, Container } from "react-bootstrap";
import "./Monespace.css";
import Footer from "../FOOTER/Footer";
import { Link } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";


/*
Composant qui représente son espace personnel.
On y trouve ses informations et la possibilité de les modifier.
On y trouve également la liste de ses animés en favori (avec possibilité de les supprimer),
la liste des épisodes des animés favoris qu'on a visionné
et la liste des épisodes d'animés qui ne sont pas dans nos favoris.
*/
function Monespace() {
  const userObj = localStorage.getItem("user");
  const connected = JSON.parse(userObj);

  const err = [];
  for (let i = 0; i < 8; i++) {
    err.push(<h1 style={{ color: "red", textAlign: "center" }}>ERREUR</h1>);
  }

  /*
  Méthode pour supprimer un animé des favoris.
  */
  async function deleteFavorite(name) {
    const res = await fetch("/registration/delete-preferred", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: connected.email,
        password: connected.password,
        preferred: name,
      }),
    });
    if (res.ok) {
      const user = await res.json();
      //construction objet
      const userObject = {
        prenom: user.prenom,
        email: user.email,
        password: user.password,
        preferred: user.preferred,
        lastEpisodes: user.lastEpisodes,
        normalEpisodes: user.normalEpisodes,
      };
      const userJson = JSON.stringify(userObject);
      localStorage.setItem("user", userJson);
    }

    window.location.reload();
  }

  const [locked, setLocked] = useState(true);

  const handleModifs = () => {
    setLocked(!locked);
  };

  const [prenom, setPrenom] = useState();
  const [password, setPassword] = useState();
  const [password2, setPassword2] = useState();

  /*
  Méthode pour modifier ses données personnelles (nom d'utilisateur et mot de passe).
  */
  async function modifyData(name, pass, pass2) {
    const res = await fetch("/registration/edit-password", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: connected.email,
        password: pass,
        password2: pass2,
        prenom: name,
      }),
    });
    if (res.ok) {
      const user = await res.json();
      if (user.errore === "errore") {
        alert("mot de passe erronée");
      } else {
        const userObject = {
          prenom: user.prenom,
          email: user.email,
          password: user.password,
          preferred: user.preferred,
          lastEpisodes: user.lastEpisodes,
          normalEpisodes: user.normalEpisodes,
        };
        const userJson = JSON.stringify(userObject);
        localStorage.setItem("user", userJson);
        window.location.reload();
      }
      const userObject = {
        prenom: user.prenom,
        email: user.email,
        password: user.password,
        preferred: user.preferred,
        lastEpisodes: user.lastEpisodes,
        normalEpisodes: user.normalEpisodes,
      };
      const userJson = JSON.stringify(userObject);
      localStorage.setItem("user", userJson);
      window.location.reload();
    }
  }

  /*
  Méthode pour supprimer son compte.
  */
  const handleDelete = () => {
    deleteAccount();
  };

  /*
  Méthode pour supprimer son compte.
  */
  async function deleteAccount() {
    const res = await fetch("/registration/delete-account", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: connected.email,
        password: connected.password,
        delete: "delete",
      }),
    });
    localStorage.removeItem("user");
    if (res.ok) {
      localStorage.removeItem("user");
    }
  }

  return (
    <div>
      {connected ? (
        <>
          <Navbar />
          <div>
            <Bloc
              title="Mes informations"
              description="Modifier mes informations ou les visualiser"
              more=""
              containerStyling={{
                marginTop: "2vh",
                marginBottom: "5vh",
                marginLeft: "5vh",
              }}
            />
            <Container responsive="true" style={{ marginLeft: "5vh" }}>
              <div>
                <div className="inp">
                  <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1">
                      NOM UTILISATEUR
                    </InputGroup.Text>
                    <Form.Control
                      placeholder={connected.prenom}
                      disabled={true}
                      onChange={(e) => setPrenom(e.target.value)}
                    />
                  </InputGroup>
                </div>
                <div className="inp">
                  <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1">EMAIL</InputGroup.Text>
                    <Form.Control value={connected.email} disabled={true} />
                  </InputGroup>
                </div>
                <div className="inp">
                  <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1">
                      MOT DE PASSE ACTUEL
                    </InputGroup.Text>
                    <Form.Control
                      value={password}
                      disabled={locked}
                      type="password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </InputGroup>
                </div>
                <div className="inp">
                  <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1">
                      NOUVEAU MOT DE PASSE
                    </InputGroup.Text>
                    <Form.Control
                      value={password2}
                      disabled={locked}
                      type="password"
                      onChange={(e) => setPassword2(e.target.value)}
                    />
                  </InputGroup>
                </div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div>
                    <Button variant="warning" onClick={handleModifs}>
                      Modify
                    </Button>

                    <Button
                      variant="danger"
                      className="ms-2"
                      onClick={handleDelete}
                      href="/"
                    >
                      {" "}
                      Supprimer compte
                    </Button>
                  </div>
                  {!locked ? (
                    <div>
                      <Button
                        className="me-3"
                        variant="success"
                        onClick={() => modifyData(prenom, password, password2)}
                      >
                        Sauvegarder
                      </Button>
                      <Button variant="danger" onClick={handleModifs}>
                        Annuler
                      </Button>
                    </div>
                  ) : null}
                </div>
              </div>
            </Container>
          </div>
          <div>
            <Bloc
              title="Mes Favoris"
              description="Liste des mes animés favoris "
              more=""
              containerStyling={{
                marginTop: "10vh",
                marginBottom: "5vh",
                marginLeft: "5vh",
              }}
            />

            {
              <div id="container">
                {connected.preferred.length !== 0 ? (
                  connected.preferred.map((anime) => (
                    <div key={anime.mal_id}>
                      <Link
                        style={{ textDecoration: "none", color: "inherit" }}
                        to={{
                          pathname: `/anime/${anime.mal_id}`,
                          state: { myanime: anime },
                        }}
                      >
                        <div>
                          <h3 style={{ marginLeft: "1vh" }}>{anime.title}</h3>

                          <img
                            alt={anime.title}
                            src={anime.images.jpg.image_url}
                            style={{
                              width: "30vh",
                              height: "45vh",
                              fontSize: "50px",
                              backgroundSize: "cover",
                              backgroundRepeat: "no-repeat",
                            }}
                            id="carta"
                          />
                        </div>
                      </Link>

                      <Button
                        variant="danger"
                        style={{ marginLeft: "1vh" }}
                        onClick={() => {
                          deleteFavorite(anime.title);
                        }}
                      >
                        supprimer
                      </Button>
                    </div>
                  ))
                ) : (
                  <h5 style={{ marginLeft: "4vh" }}>
                    {" "}
                    Aucun Animé dans les favoris !
                  </h5>
                )}
              </div>
            }
           
          </div>
          <div>
            <Bloc
              title="Mes épisodes déjà vus de mes animés favori"
              description="Liste à jour de mes épisodes déjà regardé pour chaque animé"
              more=""
              containerStyling={{
                marginTop: "10vh",
                //marginBottom: "8vh",
                marginLeft: "5vh",
              }}
            />
            {
                <Container id="container">
                  {connected.lastEpisodes !== undefined ? (
                    connected.lastEpisodes.map((e) => (
                      <Dropdown key={e.mal_id} className="me-3" style={{marginLeft:'3vh'}} >
                        <Dropdown.Toggle
                          align={{ lg: "start" }}
                          variant="light"
                          id="dropdown-menu-align-responsive-1"
                        >
                          {e.anime.title}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          {e.episodes.map((ep) => (
                            <Dropdown.Item key={ep.title}>{ep}</Dropdown.Item>
                          ))}
                        </Dropdown.Menu>
                      </Dropdown>
                    ))
                  ) : (
                    <h5> Aucun épisode de vu </h5>
                  )}
              </Container>
            }
             <Bloc
              title="Mes épisodes"
              description="Liste de mes épisodes déjà vus "
              more=""
              containerStyling={{
                marginTop: "10vh",
                marginBottom: "5vh",
                marginLeft: "5vh",
              }}
            />
            {
              <Container id="container">
                {connected.normalEpisodes ? (
                  connected.normalEpisodes.map((anime) => (
                      <Dropdown key={anime.title} className="me-3" style={{marginLeft:'3vh'}} >
                        <Dropdown.Toggle
                          align={{ lg: "start" }}
                          variant="light"
                          id="dropdown-menu-align-responsive-1"
                        >
                          {anime.anime}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          {anime.episodes.map((ep) => (
                            <Dropdown.Item key={ep.mal_id}>{ep}</Dropdown.Item>
                          ))}
                        </Dropdown.Menu>
                      </Dropdown>
                  ))
                ) : (
                  <h5> Aucun épisode vu </h5>
                )}
              </Container>
            }
            <Bloc
              containerStyling={{
                marginTop: "10vh",
                //marginBottom: "8vh",
                marginLeft: "5vh",
              }}
            />
          </div>
          <Footer />
        </>
      ) : (
        <>
          {err}
          <Bloc
            title="ERRRRRRRRRRRRRRROR"
            description="Haaa, you tried mais tu ne peux pas faire comme ça. Cet essai vera envoyé à l'administration!"
            more=""
            containerStyling={{
              marginTop: "2vh",
              marginBottom: "5vh",
              marginLeft: "5vh",
            }}
          />
          {err}
        </>
      )}
    </div>
  );
}

export default Monespace;
