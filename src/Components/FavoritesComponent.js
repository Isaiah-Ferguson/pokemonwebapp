import React, { useState } from 'react';
import {  getLocalStorage, removeFromLocalStorage } from "../DataServices/localstorage";
import {  Row, Col } from 'react-bootstrap'
import x from '../assets/X.png'
import { PokemonApiCall, PokeLocationCall, PokeEvoCall, PokeDescriptionCall,FavoritesPokemonApiCall } from '../DataServices/DataServices';

function Favorites() {
    const [pokemon, setPokemon] = useState('');
    const [height, setHeight] = useState({});
    const [img, setImg] = useState('');
    const [weight, setWeight] = useState('');
    const [order, setOrder] = useState('');
  const [favorites, setFavorites] = useState(getLocalStorage());

  const handleRemove = (pokemon) => {
    removeFromLocalStorage(pokemon);
    setFavorites(favorites.filter(favCity => favCity !== pokemon));
  }

  const handlePokemonClick = (pokemon) => {
    const getPokemon = async () => {
        console.log(pokemon)
        const pokeFav = await FavoritesPokemonApiCall(pokemon);
  
        setHeight(pokeFav);
        setWeight(pokeFav);
        setOrder(pokeFav)
        setImg(pokeFav.sprite);
      };
      getPokemon();
    
  }

  return (
    <>
              <Row>
            <Col lg={6}><img style={{width: 200}} src={img}></img></Col>
            <Col lg={6}>
<p> Order # {order.Order}</p>
<p>Weight {weight.Weight} lbs</p>
<p>Height {height.Height} Inches</p>

            </Col>
          </Row>
      {favorites.map(pokemon => (
        <div key={pokemon}>

            <Row style={{paddingTop: 30}}>
                <Col lg={6} sm={6}>
                <p
                className='pokeFaverite'
              style={{ fontSize: "21px", paddingTop: "3px" }}
              onClick={() => handlePokemonClick(pokemon)}>
              {pokemon}
              <img style={{height: 20, marginLeft: '25px'}} onClick={() => handleRemove(pokemon)} src={x}/>
            </p>

            
                </Col>

            </Row>
        </div>
      ))}

      <div>

      </div>
    </>
  );
}

export default Favorites;