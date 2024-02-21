import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../NAVBAR/Navbar";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { Table } from "react-bootstrap";
import Bloc from "../BLOC/Bloc";
import "./Anime.css";
import Footer from "../FOOTER/Footer";
import * as Icon from "react-bootstrap-icons";
import api from "../../service/api";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';


/*
Composant qui affiche un animé, son résumé, des informations le concernant,
la liste de ses épisodes par page de 100 (si disponible dans la base de données),
la possibilité d'ajouter ou supprimer un animé en favori, d'ajouter un épisode
dans la liste des visionnés et d'accéder à l'épisode sur MyAnimeList.
*/

function Anime(props) {
  /*
  Récupération de l'animé courant grâce au props.

  */
  let myanime = props.location.state.myanime;

  console.log(myanime);
  const [episodeList, SetEpisodeList] = useState([]);

  const [page, setPage] = React.useState(1);

  /*
  Méthode pour remonter au début de la page
  */
  const handleUp = () => {
    const debut = document.getElementById("qui");
    if (debut) {
      debut.scrollIntoView({ behavior: "smooth" });
    }
  };

  /*
  Méthode pour modifier la page courante des épisodes
  */
  const handleChange = (event, value) => {
    setPage(value);
    handleUp();
  };

  const [nbrPage, setNbrPage] = useState(1);

  /*
  UseEffect appelé lorsque l'animé change pour récupérer ses épisodes
  */
  useEffect(() => {
    api.getAnimeEpisodes(myanime.mal_id, page).then((res) => {
      SetEpisodeList(res.data);
      setNbrPage(res.pagination.last_visible_page);
    });
  }, [myanime, page]);

  /*
  UseEffect appelé lorsque l'animé change pour afficher la première page
  */
  useEffect(() => {
    setPage(1);
  }, [myanime]);

  useEffect(() => {
    const debut = document.getElementById("top");
    if (debut) {
      debut.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  ////////////////////////////////////////////////
  const userObj = localStorage.getItem("user");
  const connected = JSON.parse(userObj);
  ////////////////////////////////////////////////

  /*
  Ajout d'un animé en favori
  */
  async function addFavorite(name) {
    const res = await fetch("/registration/add-preferred", {
      method: "PUT",
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
        normalEpisodes: user.normalEpisodes
      };
      const userJson = JSON.stringify(userObject);
      localStorage.setItem("user", userJson);
    }
  }

  ////////////////////////////////////////

  /*
    Suppression d'un animé des favoris
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

  }

  ////////////////////////////////////////

  /*
  Ajout d'un épisode dans les épisodes visionnés
  */
  async function addEpisodeFavorite(name) {
    const res = await fetch("/registration/add-preferred", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: connected.email,
        password: connected.password,
        lastEpisodes: {
          anime: myanime,
          episodes: name.mal_id + ". " + name.title,
        },
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
        normalEpisodes: user.normalEpisodes
      };
      const userJson = JSON.stringify(userObject);
      localStorage.setItem("user", userJson);
    }
  }
  ////////////////////////////////////////

  /*
  Méthode pour le bouton d'ajout en favori, ajoute ou supprime l'animé en favori en fonction de l'état checked
  */
  const [checked, setChecked] = useState(false);
  const toggleCheckbox = () => {

    if (!checked) {
      addFavorite(myanime);
      setChecked(!checked);
    }
    else {
      deleteFavorite(myanime.title);
      setChecked(!checked);
    }
  };

  /*
  UseEffect pour vérifié si un animé est dans les favoris afin de mettre le checked dans le bon état
  */
  useEffect(() => {
    let found = false;
    if (connected !== null) {
      connected.preferred.forEach(element => {
        if (element.title === myanime.title) {
          setChecked(true);
          found = true;
        }
        else {
          if (!found) setChecked(false);
        }
      });
    }
  }, [myanime])

  /*
    Ajout d'un épisode dans les épisodes d'un animé favori vu
  */
  async function addNormalEpisode(name, episode) {
    if (!checked) {
      const res = await fetch("/registration/add-episode", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: connected.email,
          password: connected.password,
          normalEpisodes: {
            name: name,
            episodes: episode
          },
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
          normalEpisodes: user.normalEpisodes
        };
        const userJson = JSON.stringify(userObject);
        localStorage.setItem("user", userJson);
      }
    }
  }

  return (
    <div >
      <div id="top" ></div>
      <Navbar />
      <Container id="cambia">
        <Container style={{ marginBottom: "3vh" }}>
          <img
            className="d-block mt-3"
            alt={myanime.title}
            src={myanime.images.jpg.large_image_url}
            style={{
              height: "80vh",
              width: "50vh",
              marginTop: "-70px",
              fontSize: "50px",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          />
          <br />
          <br />
          {connected ? (
            <label>
              {checked ? <Icon.StarFill size={25} /> : <Icon.Star size={25} />}
              <input
                type="checkbox"
                onChange={toggleCheckbox}
                checked={checked}
                hidden
              />{" "}
              Ajouter en Favori !
            </label>
          ) : null}
        </Container>
        <Container className="divInteriore" style={{ marginBottom: "3vh" }}>
          <div>
            <p>
              <b>Nombre d'épisode : </b>
              {myanime.episodes}
            </p>
            <p>
              <b> Diffusion :</b>{" "}
              {myanime.airing === false ? "Terminé" : "En cours"}{" "}
            </p>
            <p>
              <b>Genre(s) : </b>
              {myanime.genres.map((genre) => genre.name + "  ")}
            </p>
            <p>
              <b>Note :</b> {myanime.score} / 10
            </p>
            <p>
              <b>Studio :</b> {
                myanime.studios.length === 0 ? "Aucun" :
                  myanime.studios[0].name}
            </p>
            <p>
              <b>Année :</b> {myanime.year}
            </p>
          </div>
        </Container>
        <Container className="divRiassunto">
          <div>
            <h3>Resume</h3>
            {
              myanime.synopsis === null ? "Aucun résumé pour cet animé..." :
                myanime.synopsis}
          </div>
        </Container>
      </Container>
      <Bloc
        title="Liste des épisodes"
        description="Voici tout les épisodes , si l'animé est dans vos favoris, le bouton VU sera en vert, sinon il sera en gris."
        more=""
        containerStyling={{
          marginTop: "5vh",
          marginBottom: "5vh",
          marginLeft: "2vh",
        }}
      />
      <div id="qui" style={{ marginLeft: "2vh", marginRight: "2vh" }}>
        <Table responsive="true">
          <tr>
            <th></th>
            <th
              style={{
                textAlign: "center",
                borderRightStyle: "hidden",
                borderLeftStyle: "hidden",
              }}
            >
              Nom épisode
            </th>
            <th></th>
          </tr>
          {episodeList.length === 0 ?

            <tr>
              <td style={{ textAlign: "center" }}> 1 </td>
              <td style={{ textAlign: "center" }}>
                <div style={{ textAlign: "center" }}>
                  <a
                    href={myanime.url}
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                      backgroundColor: "white",

                    }} target="_blank" rel="noreferrer"
                  >
                    <p style={{ justifyContent: "center" }}>{myanime.title}</p>
                  </a>
                </div>
              </td>
              <td style={{ textAlign: "center", borderLeftStyle: "hidden" }}>
                {connected ?
                ( checked ? (
                  <Button
                    style={{ backgroundColor: "green", color: "white" }}
                    onClick={() => addEpisodeFavorite(myanime)}
                  >
                    VU
                  </Button>
                ) : <Button
                  style={{ backgroundColor: "lightgray", color: "white" }}
                  onClick={() => addNormalEpisode(myanime.title, myanime.title)}
                >
                  VU
                </Button>):null}
              </td>
            </tr>
            :
            episodeList.map((episode) => (
              <tr key={episode.mal_id}>
                <td style={{ textAlign: "center" }}> {episode.mal_id} </td>
                <td style={{ textAlign: "center" }}>
                  <div style={{ textAlign: "center" }}>
                    <a
                      href={episode.url}
                      style={{
                        textDecoration: "none",
                        color: "inherit",
                        backgroundColor: "white",

                      }} target="_blank" rel="noreferrer"
                    >
                      <p style={{ justifyContent: "center" }}>{episode.title}</p>
                    </a>
                  </div>
                </td>
                <td style={{ textAlign: "center", borderLeftStyle: "hidden" }}>
                  
                  {connected ? (
                  
                  checked ? (
                    <Button
                      style={{ backgroundColor: "green", color: "white" }}
                      onClick={() => addEpisodeFavorite(episode)}
                    >
                      VU
                    </Button>
                  ) : <Button
                    style={{ backgroundColor: "lightgray", color: "white" }}
                    onClick={() => addNormalEpisode(myanime.title, episode.title)}
                  >
                    VU
                  </Button>) :null}
                </td>
              </tr>
            ))}
        </Table>
      </div>
      <div
        className="pagination"
        style={{ justifyContent: "center", alignContent: "center" }}
      >
        <Stack spacing={2}>
          <Pagination count={nbrPage} page={page} onChange={handleChange} />
        </Stack>
      </div>
      <Button variant="light" className="mt-3 mb-5 ms-5">
        {" "}
        <Link to="/" style={{ textDecoration: "none" }}>
          Revenir à la page d'accueil
        </Link>
      </Button>
      <Bloc
        containerStyling={{
          marginTop: "10vh",
          //marginBottom: "8vh",
          marginLeft: "5vh",
        }}
      />
      <br /> <br /> <br />
      <Footer />
    </div>
  );
}

export default Anime;
