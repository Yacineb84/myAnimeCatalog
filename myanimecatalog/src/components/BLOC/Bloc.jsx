import React, { useEffect } from "react";
import "./Bloc.css";
import Container from "react-bootstrap/Container";


function Bloc({ title, description, more, containerStyling, image }) {
  useEffect(() => { if(image!=null){console.log("image : "+image)} });
  let val = image;

  return (
    <Container style={containerStyling}>
      <h2>{title}</h2>
      <Container style={{ marginVertical: 5 }}>
        <p style={{marginLeft:'-1vh'}} >{description}</p>
        {image ? (
          <img
            className="d-block"
            src={val}
            style={{width:'40vh'}}
            alt={image}
          />
        ) : null}
      </Container>
      <span>{more}</span>
    </Container>
  );
}

export default Bloc;
