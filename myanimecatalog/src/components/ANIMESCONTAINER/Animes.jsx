import React from "react";
import { Link } from "react-router-dom";
import "./Animes.css";


/*
Componant qui affiche la liste des animés, par genre optionnellement, par page de 25.
Affiche l'animé avec son titre et son image, et lorsque l'on clique dessus, cela nous redirige vers
sa page, géré par le composant "Anime".
*/

function Animes(props) {

  /*
  Récupération de la liste des animés
  */
  let animesList = props.listAnime;
  
  return (
    <div id="container">
      {animesList.map((anime) => (
        <div key={anime.mal_id}>
        
        <Link to=
        {{pathname:`/anime/${anime.mal_id}`,
          state: {myanime: anime}
        }}
        style={{ textDecoration:'none', color:'inherit', marginLeft:'1vh' }}
        >
          {anime.title}
          <div >
            <img
              alt={anime.title}
              src={anime.images.jpg.image_url}
              style={{
                width: "30vh",
                height:'45vh',
                fontSize: "50px",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
              }}
              id="carta"
            />
          </div>
        </Link>
        </div>
      ))}
      
    </div>
  );
}

export default Animes;
