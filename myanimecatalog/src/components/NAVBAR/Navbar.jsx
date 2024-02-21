/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from "react";

import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import * as Icon from "react-bootstrap-icons";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import Link from "react-router-dom/Link";
import Login from "../LOGIN/Login";
import Register from "../REGISTER/Register";
import SearchModal from "../SEARCH/SearchModal";
import api from "../../service/api";


/*
Composant de la barre de navigation.
On y retrouve le top 5 des animés, la barre de recherche 
et les boutons pour se connecter/deconnecter et accéder à son espace.
Si une recherche est faite avec la barre de recherche, une box s'ouvre avec les animés de la recherche.
*/
function laMiaNavbar() {
  const [showModal, setShowModal] = useState(false);
  const [searchModal, setSearchModal] = useState(false);
  const [currentForm, setCurrentForm] = useState("login");
  const [user, setuser] = useState();

  const [toSearch, setToSearch] = useState("");
  const [searchList, setSearchList] = useState([]);

  const [animesList, setAnimesList] = useState([]);

  /*
  UseEffect pour récupéré les 5 animés les plus populaires.
  */
  useEffect(() => {
    api.getTopAnime().then((res) => {
      setAnimesList(res.data.slice(0, 5));
    });
  }, []);

  const activeForm = (nom) => {
    setCurrentForm(nom);
  };

  const userObj = localStorage.getItem("user");
  const connected = JSON.parse(userObj);

  /*
  UseEffect pour se déconnecter.
  */
  const handleLogout = () => {
    localStorage.removeItem("user");
  };

  /*
  UseEffect pour récupérer et afficher les animés selon la barre de recherche.
  */
  const HandleSearch = () => {
    api.getAnimeByName(toSearch).then((res) => {
      setSearchList(res.data);
      setSearchModal(true);
    });
  };

  const handleEnterPressed = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      HandleSearch();
    }
  };

  return (
    <Navbar bg="light" expand="lg" className="p-3">
      <Navbar.Brand>
        <Nav.Link href="/">Mr.Anime</Nav.Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          {animesList.map((anime) => (
            <Link key={anime.mal_id}
              to={{
                pathname: `/anime/${anime.mal_id}`,
                state: { myanime: anime, topAnime: animesList },
              }}
              style={{
                textDecoration: "none",
                color: "inherit",
                alignSelf: "center",
                marginLeft: "2vh",
                marginRight: "2vh",
              }}
            >
              {anime.title}
            </Link>
          ))}
        </Nav>
      </Navbar.Collapse>
      <Form inline="true" style={{ marginLeft: "auto" }} className="d-flex">
        <Row
          inline="true"
          style={{ alignContent: "center", justifyContent: "center" }}
        >
          <Col xs="auto">
            <Form.Control
              onKeyDown={handleEnterPressed}
              type="text"
              placeholder="Rechercher"
              className=" mr-sm-2"
              onChange={(e) => setToSearch(e.currentTarget.value)}
            />
          </Col>
          <Col xs="auto">
            <Button variant="light">
              <Icon.Search
                className=""
                color="black"
                size={25}
                onClick={() => {
                  if (toSearch === "" || toSearch === undefined) {
                    return null;
                  } else {
                    HandleSearch();
                  }
                }}
              />
            </Button>
            <SearchModal
              show={searchModal}
              onHide={() => (setSearchModal(false), setToSearch(""))}
              tosearch={
                toSearch !== undefined ? toSearch.toLowerCase() : toSearch
              }
              animeslist={searchList}
            />
          </Col>
          <Col xs="auto">
            <Button variant="light">
              {connected ? (
                <Dropdown className="me-3">
                  <Dropdown.Toggle
                    align={{ lg: "start" }}
                    variant="success"
                    id="dropdown-menu-align-responsive-1"
                  >
                    Connecté {connected.prenom}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item href="/monespace">Mon espace</Dropdown.Item>
                    <Dropdown.Item
                      href="/"
                      onClick={() => {
                        handleLogout();
                      }}
                    >
                      Se déconnecter
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <Icon.Person
                  className=""
                  color="black"
                  size={25}
                  onClick={() => {
                    setShowModal(true);
                  }}
                />
              )}
            </Button>
          </Col>
        </Row>
      </Form>
      {currentForm === "login" ? (
        <Login
          switch={activeForm}
          show={showModal}
          hide={() => setShowModal(false)}
          logged={(u) => setuser(u)}
        />
      ) : (
        <Register
          switch={activeForm}
          show={showModal}
          hide={() => setShowModal(false)}
        />
      )}
    </Navbar>
  );
}

export default laMiaNavbar;
