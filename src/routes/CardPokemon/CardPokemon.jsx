import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import {
  BoxCard,
  EsquerdoCard,
  DireitoCard,
  ImgFundo,
  ImgPrincipal,
  ButtonCapturar,
  ButtonCapturar2,
  TypeImg,
  TypeImg2,
} from './Poke.styled'
import { useEffect, useState } from 'react'
import Fundo from '../../assets/Fundo.png'
import { getTypes } from '../utils/ReturnPokemonType'
import { getColors } from '../utils/ReturnCardColor'
import { GlobalContext } from '../../contexts/GlobalContext'



const CardPokemon = (props, { showLink = true }) => {
  const context = useContext(GlobalContext)
  const { cardTop, addToPokedex, removeFromPokedex, setFlow, openModalCapturar, setModalOpen } = context
  const [cadaPokemon, setCadaPokemon] = useState([])
  const [cadaPokemonImg, setCadaPokemonImg] = useState([])
  const [poder, setPoder] = useState([])
  const [poder2, setPoder2] = useState([])
  const { pokemonUrlCada, isHomePage, isPokedex, pokemon} = props

  const fetchPokemon2 = async () => {
    try {
      const APIResponse = await axios.get(pokemonUrlCada)
      setCadaPokemon(APIResponse.data)
    }
    catch (error){

    }    
  }
  const renderPokemon = async () => {
  if(cadaPokemon.sprites){
    setCadaPokemonImg(cadaPokemon['sprites']['other']['official-artwork']['front_default'])
   }
   if(cadaPokemon.types){
    setPoder(cadaPokemon['types']['0']['type']['name'])
   } 
   if(cadaPokemon.types){
    setPoder2(cadaPokemon.types[1]?.type?.name)
   }
  }

  useEffect(() => {
    fetchPokemon2()
  }, [cardTop])

  useEffect(()=>{
    renderPokemon()
  },[cadaPokemon])


  // Adicionar a pokedex e abrir o modal

  function modalEaddToPokedex () {
    setModalOpen(true)
    addToPokedex(cadaPokemon)
  }
  function modalRemoveToPokedex () {
    setModalOpen(true)
    removeFromPokedex(pokemon)
  }

  return (
    <>
      {isHomePage && <BoxCard color={getColors(poder)}>
        <EsquerdoCard>
          {cadaPokemon.id < 10 ? (<p>{"#0" + cadaPokemon.id}</p>) : (<p>{"#" + cadaPokemon.id}</p>)}
          <h2>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2>
          {poder2 && <span>{<TypeImg src={getTypes(poder2)} />}</span>}
          {poder.length > 1 && <span>{<TypeImg2 src={getTypes(poder)} />}</span>}
          <div className='linkDetalhes'>
            {showLink && <Link onClick={()=>{setFlow(2)}} className='nameDetalhes' to={`/detalhes/${pokemon.name}`}>Detalhes</Link>}
          </div>
        </EsquerdoCard>
        <DireitoCard>
          {cadaPokemon && <ImgPrincipal src={cadaPokemonImg} alt="cadaImg" />}
          <ImgFundo src={Fundo} />
          <ButtonCapturar onClick={() => modalEaddToPokedex()}>Capturar!</ButtonCapturar>
        </DireitoCard>
      </BoxCard>}
      {isPokedex && cardTop.length > 1 && <BoxCard color={getColors(pokemon['types']['0']['type']['name'])}>
        <EsquerdoCard>
          {pokemon.id < 10 ? (<p>{"#0" + pokemon.id}</p>) : (<p>{"#" + pokemon.id}</p>)}
          <h2>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2>
          {pokemon.types[1]?.type?.name && pokemon['types']['1']?.type.name && <span>{<TypeImg src={getTypes(pokemon['types']['1']?.type.name)} />}</span>}
          {pokemon['types']['0']['type']['name'] && <span>{<TypeImg2 src={getTypes(pokemon['types']['0']['type']['name'])} />}</span>}
          <div className='linkDetalhes'>
            {showLink && <Link onClick={()=>{setFlow(1)}} className='nameDetalhes' to={`/detalhes/${pokemon.name}`}>Detalhes</Link>}
          </div>
        </EsquerdoCard>
        <DireitoCard>
          {cadaPokemon && <ImgPrincipal src={pokemon['sprites']['other']['official-artwork']['front_default']} alt="cadaImg" />}
          <ImgFundo src={Fundo} />
          <ButtonCapturar2 onClick={() => modalRemoveToPokedex()}>Excluir</ButtonCapturar2>
        </DireitoCard>
      </BoxCard>}


    </>
  )
}

export default CardPokemon