import React, { useState } from 'react';
import {  getLocalStorage, removeFromLocalStorage } from "../DataServices/localstorage";
import {  Row, Col } from 'react-bootstrap'
import x from '../assets/X.png'
import { PokemonApiCall, PokeLocationCall, PokeEvoCall, PokeDescriptionCall } from '../DataServices/DataServices';

function Favorites() {
    const [pokemon, setPokemon] = useState('charmander');
    const [test, setTest] = useState({});
    const [test2, setTest2] = useState('');
    const [location, setLocation] = useState('');
    const [evolution, setEvolution] = useState('');
    const [description, setDescription] = useState('');
  const [favorites, setFavorites] = useState(getLocalStorage());

  const handleRemove = (pokemon) => {
    removeFromLocalStorage(pokemon);
    setFavorites(favorites.filter(favCity => favCity !== pokemon));
  }

  const handlePokemonClick = (pokemon) => {
    const getPokemon = async () => {
        console.log(pokemon)
        const pokeFav = await PokemonApiCall(pokemon);
        let Location = await PokeLocationCall(pokeFav.Location);
        let Evolution = await PokeEvoCall(pokeFav.Evo);
        let Desc = await PokeDescriptionCall(pokeFav.Evo)
        setDescription(Desc);
        setEvolution(Evolution);
        setTest(pokeFav)
        setLocation(Location);
        setTest2(pokeFav.sprite);
      };
      getPokemon();
    
  }

  return (
    <>
      {favorites.map(pokemon => (
        <div key={pokemon}>
            <Row style={{paddingTop: 30}}>
                <Col lg={6} sm={6}>
                <p
                className='pokeFaverite'
              style={{ fontSize: "21px", paddingTop: "3px" }}
              onClick={() => handlePokemonClick(pokemon)}>
              {pokemon}
            </p>
                </Col>
                <Col lg={6} sm={6}>
                <div className="" onClick={() => handleRemove(pokemon)}>
              <img style={{height: 40}} src={x}/>
            </div>
                </Col>
            </Row>
        </div>
      ))}
    </>
  );
}

export default Favorites;