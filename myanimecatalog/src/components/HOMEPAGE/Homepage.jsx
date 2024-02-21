import React, { useState, useEffect } from "react";
import "./Homepage.css";
import api from "../../service/api";
import Navbar from "../NAVBAR/Navbar";
import Footer from "../FOOTER/Footer";

import Carousel from "../CAROUSEL/Carousel";
import Bloc from "../BLOC/Bloc";
import Animes from "../ANIMESCONTAINER/Animes";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Button from "react-bootstrap/Button";
import { Container } from "react-bootstrap";


/*
Composant de la page principale, dans lequel se trouve la barre de navigation,
le carousel et la liste des animés ainsi que les boutons pour changer de genre.
*/
const Homepage = () => {
  const [animesList, setAnimesList] = useState([]);

  const [page, setPage] = React.useState(1);

  const handleUp = () => {
    const debut = document.getElementById("qui");
    if (debut) {
      debut.scrollIntoView({ behavior: "smooth" });
    }
  };

  const [nbrPage, setNbrPage] = useState(1);

  const [genre, setGenre] = useState(0);

  const handleChange = (event, value) => {
    setPage(value);
    handleUp();
  };

  /*
  UseEffect qui récupère les animés avec l'API, selon l'état du genre et la pagination 
  (par défaut, le genre 0 sera trié par popularité).
  */
  useEffect(() => {

    if (genre === 0) {
      api.getAnimeByPage(page).then((res) => {
        setAnimesList(res.data);
        setNbrPage(res.pagination.last_visible_page);
      });
    } else {
      changeGenre(genre, page);
    }
  }, [page, genre]);


  /*
  UseEffect pour retourner à la première page si on change de genre.
  */
  useEffect(() => {
    setPage(1);
  }, [genre]);

  /*
  Méthode qui modifie les données selon le genre.
  */
  const changeGenre = (id, page) => {
    api.getAnimeByGenre(id, page).then((res) => {
      setNbrPage(res.pagination.last_visible_page);
      setAnimesList(res.data);
    });
  };

  return (
    <div>
      <Navbar />
      <Bloc
        title="Les 3 animés du moment !"
        more=""
        containerStyling={{ marginTop: "5vh", marginBottom: "5vh", textAlign:'center' }}
      />
      <Carousel />
      <div id="qui"></div>
      <Bloc
        title="Liste des animés"
        description="Visualisez tous les animés ou choisissez un genre"
        containerStyling={{ marginTop: "7vh", marginBottom: "5vh", textAlign:'center' }}
      />
      <Container id="genresCont" style={{ textAlign:'center'}} >
      <Button
          variant="light"
          onClick={() => {
            setGenre(0);
          }}
        >
          Tous
        </Button>
        <Button
          variant="light"
          onClick={() => {
            setGenre(1);
          }}
        >
          Action
        </Button>

        <Button
          variant="light"
          onClick={() => {
            setGenre(2);
          }}
        >
          Aventure
        </Button>

        <Button
          variant="light"
          onClick={() => {
            setGenre(4);
          }}
        >
          Comédie
        </Button>

        <Button
          variant="light"
          onClick={() => {
            setGenre(8);
          }}
        >
          Drame
        </Button>

        <Button
          variant="light"
          onClick={() => {
            setGenre(41);
          }}
        >
          Suspense
        </Button>

        <Button
          variant="light"
          onClick={() => {
            setGenre(10);
          }}
        >
          Fantastique
        </Button>

        <Button
          variant="light"
          onClick={() => {
            setGenre(22);
          }}
        >
          Romance
        </Button>
      </Container>

      <Animes listAnime={animesList} />

      <div
        className="pagination"
        style={{ justifyContent: "center", alignContent: "center" }}
      >
        <Stack spacing={2}>
          <Pagination count={nbrPage} page={page} onChange={handleChange} />
        </Stack>
      </div>
      <Bloc
        containerStyling={{
          marginTop: "10vh",
          //marginBottom: "8vh",
          marginLeft: "5vh",
        }}
      />
      <Footer />
    </div>
  );
};

export default Homepage;
