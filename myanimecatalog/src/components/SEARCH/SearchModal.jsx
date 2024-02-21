import React, { useEffect,useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Link from "react-router-dom/Link";

/*
Composant pour afficher la liste des animés de la recherche.
Affiche les animés avec leur titre et leur image,
avec la possibilité de cliquer dessus afin d'être redirigé 
vers la page de l'animé avec ses informations, liste d'épisodes, ect...
*/
function SearchModal(props) {
  const [animes, setAnimes] = useState(props.animeslist);

  /*
  UseEffect pour récupérer et mettre à jour la liste des animés lorsque la recherche change.
  */
  useEffect(() => {
    console.log("je fais ça");
    setAnimes(props.animeslist);
  }, [props.animeslist]);

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      style={{ width: "100%" }}
      fullscreen={true}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Recherche de l'anime {props.tosearch}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          {animes !== undefined ? (
            animes.map((a) => (
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Link
                  to={{
                    pathname: `/anime/${a.mal_id}`,
                    state: { myanime: a },
                  }}
                  style={{
                    textDecoration: "none",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    color:'inherit'
                  }}
                  onClick={()=>(props.onHide())}
                >
                  <img
                    alt={a.title}
                    src={a.images.jpg.image_url}
                    style={{
                      width: "30vh",
                      height:"45vh",
                      fontSize: "50px",
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                    }}
                    id="carta"
                  />

                  <h3>{a.title}</h3>
                </Link>
              </div>
            ))
          ) : (
            <p>2</p>
          )}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button  variant="danger" onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default SearchModal;
