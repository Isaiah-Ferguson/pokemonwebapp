import React from 'react'
import { Col,Row } from 'react-bootstrap'
import { PokeEvoTwoCall, PokeLocationCall, PokemonApiCall, spriteFetch } from '../DataServices/DataServices'
export default function PokemonCard(props) {



  return (
    <div className='Card'>
      <div className='card-back'>
        <div className='card-front'>
        <Row className='d-flex justify-content-between'>
        <Col>{props.name}</Col>
        
        <Col className='d-flex justify-content-end types'>{props.type}</Col>
        </Row>
        
        <Row className=' d-flex justify-content-center'>
        <Col lg={11} sm={11} xs={11}className='SpriteBG'>
          <img src={props.sprites}/>
        </Col>
        </Row>
        <Row className=' d-flex justify-content-center'>
            <Col lg={9} md={9} sm={9} xs={9} className='Loca'>
            {props.location}
            </Col>
        </Row>
        <Col className='MoveBg'>
            <h4 className='text-center'>{props.ability}</h4>
            <div className='d-flex justify-content-center'>
            <div className='scrollDiv'>{props.moves}</div>
            </div>
            <br/>
            <div>{props.Evolution}</div>
            <br></br>
            <div  className='d-flex justify-content-center'>
            <div className='Description'>{props.Description}</div>
            </div>
            
        </Col>
        </div>
      </div>
     
    </div>
  )
}
