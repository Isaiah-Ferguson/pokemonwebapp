import React, { useEffect, useState } from 'react'
import PokemonCard from './PokemonCard'
import { Row, Col, Button, Form, InputGroup } from 'react-bootstrap'
import { PokeDescriptionCall, PokeLocationCall, PokemonApiCall, PokeEvoCall } from '../DataServices/DataServices'
import FavoritesList from './OffCanvasModule'
export default function MainPage() {
  const banner = require('../assets/Logo.png')
    const [pokemon, setPokemon] = useState('charmander');
    const [test, setTest] = useState({});
    const [test2, setTest2] = useState('');
    const [location, setLocation] = useState('');
    const [evolution, setEvolution] = useState('');
    const [description, setDescription] = useState('');
    const [name, setName] = useState('');

    const handleSearch = (e) => {
        setPokemon(e.target.value)
    }

    useEffect(() => {
      const getPokemon = async () => {
        const pokeFav = await PokemonApiCall(pokemon);
        let Location = await PokeLocationCall(pokeFav.Location);
        let Evolution = await PokeEvoCall(pokeFav.Evo);
        let Desc = await PokeDescriptionCall(pokeFav.Evo)
        setName(pokeFav.Evo)
        setDescription(Desc);
        setEvolution(Evolution);
        setTest(pokeFav)
        setLocation(Location);
        setTest2(pokeFav.sprite);
      };
      getPokemon();
    },[])
    const getPokemon = async () => {
      const pokeFav = await PokemonApiCall(pokemon);
      let Location = await PokeLocationCall(pokeFav.Location);
      let Evolution = await PokeEvoCall(pokeFav.Evo);
      let Desc = await PokeDescriptionCall(pokeFav.Evo);
      setDescription(Desc);
      setEvolution(Evolution);
      setTest(pokeFav);
      setLocation(Location);
      setTest2(pokeFav.sprite);
    };
  return (
    <div className='container-fluid dayBG'>
      <div className='d-flex justify-content-center'>
      <img className='img-fluid banner' src={banner}/>
      </div>
              
        <Row>
            <Col className='d-flex justify-content-center'>
            <PokemonCard name={test.Name} type={test.Type} ability={test.Ability} moves={test.Moves} sprites={test2} location={location} Evolution={evolution} Description={description} fav={name}/>
            </Col>
        </Row>

        <div className='searchDiv'>
        <InputGroup className="mb-3">
        <Button onClick={getPokemon} variant="outline-secondary" id="button-addon1">
          Search
        </Button>
        <Form.Control
          aria-label="Example text with button addon"
          aria-describedby="basic-addon1"
          onChange={handleSearch}
        />
         <FavoritesList/>
      </InputGroup>
     
        </div>
        
    </div>
  )
}
