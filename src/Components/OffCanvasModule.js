import React, { useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import  Favorites  from './FavoritesComponent'
import { Button } from 'react-bootstrap';

export default function FavoritesList({ name, ...props }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button  onClick={handleShow} >
        Favorites List
      </Button>
      <Offcanvas show={show} onHide={handleClose} {...props}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Favorite Pokemon</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Favorites/>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

