
import React from "react";
import Naruto from "../../images/Naruto.jpg";
import Onepiece from "../../images/Onepiece.png";
import MyHeroAcademia from "../../images/MyHeroAcademia.jpg";
import { Carousel } from "react-bootstrap";
import "../CAROUSEL/Carousel.css"

/*
Composant qui affiche le top 3 des animés (selon notre préférence).
L'ajout d'un lien pour rediriger sur la page Anime était impossible
à cause de la limitation de l'API de 3 appels par seconde.
Donc ces animés ont été codé en dur (image et titre).
*/

function Carosello() {

 /* const [anime, setanime] = useState();

  function handleClick(anime) {
    api.getAnimeByName(anime).then((res) => {
      setanime(res.data);
    });
  }*/

  return (
    <Carousel style={{alignItems:'center', justifyContent:'center'}}>
      <Carousel.Item>
      {/*<Link to=
        {{pathname:`/anime/${anime.mal_id}`,
          state: {myanime: anime}
        }} onclick={handleClick("Naruto")}>*/}
        <img
          className="d-block w-100"
          alt="Slide Naruto"
          style={{
            backgroundImage: `url(${Naruto})`,
            height: "80vh",
            marginTop: "-70px",
            fontSize: "50px",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        />
        
        <Carousel.Caption className="caption">
          <h3>Naruto Shippuden</h3>
        </Carousel.Caption>
      </Carousel.Item>
      {/**********************************************/}
      <Carousel.Item style={{alignSelf:'center'}}>
        <img
          className="d-block"
          style={{
            backgroundImage: `url(${Onepiece})`,
            height: "80vh",
            marginTop: "-70px",
            fontSize: "50px",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
          alt="Slide Onepiece"
        />
        <Carousel.Caption className="caption">
          <h3>One Piece</h3>
        </Carousel.Caption>
      </Carousel.Item>
       {/**********************************************/}
       <Carousel.Item style={{alignSelf:'center'}}>
        <img
          className="d-block"
          style={{
            backgroundImage: `url(${MyHeroAcademia})`,
            height: "80vh",
            marginTop: "-70px",
            fontSize: "50px",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
          alt="Slide My hero Academia"
        />
        <Carousel.Caption className="caption">
          <h3>My Hero Academia</h3>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default Carosello;
