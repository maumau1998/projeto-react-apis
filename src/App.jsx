import Router from './routes/Router'
import { GlobalContext } from './contexts/GlobalContext'
import { useEffect, useState } from 'react'
import axios from 'axios'


function App() {
  const [cardTop, setCardTop] = useState([])
  const [pokedex, setPokedex] = useState([]);
  const [modalOpen, setModalOpen] = useState(false)
  const [flow, setFlow] = useState(2)
  const [nextPage, setNextPage] = useState(0)
  const [contador, setContador] = useState(1)
  const quantidadePoke = 21

// Primeira requisição a API

  const fetchPokemon = async () => {
    try{
    const APIResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon/?offset=${nextPage}&limit=${quantidadePoke}`)
    setCardTop(APIResponse.data.results)
    setPokedex(cardTop)
    pegarPokes()
    }
    catch(error){
      
    }
  }

  useEffect(() => {
    if(contador >= 1){
    fetchPokemon()
    }
  }, [contador])
// Adicionar a Pokedex

  const addToPokedex = (pokemonToAdd) => {
    const isAlreadyOnPokedex = pokedex.find(
      (pokemonInPokedex) => pokemonInPokedex.name === pokemonToAdd.name
    );

    if (!isAlreadyOnPokedex) {
      const newPokedex = [...pokedex, pokemonToAdd];
      setPokedex(newPokedex);
      setFlow(1)
      const pokedexString = JSON.stringify(newPokedex)
      window.localStorage.setItem("pokemon", pokedexString)
    }
  }
  const pegarPokes = () => {
    if(localStorage.getItem("pokemon")){
      const newListaPokedex = localStorage.getItem("pokemon")
      const pokedex2 = JSON.parse(newListaPokedex)
      setPokedex(pokedex2)}
  }

// Remover da Pokedex

  const removeFromPokedex = (pokemonToRemove) => {
    const newPokedex = pokedex.filter(
      (pokemonInPokedex) => pokemonInPokedex.name !== pokemonToRemove.name
    );
    setPokedex(newPokedex)
    const pokedexString = JSON.stringify(newPokedex)
    window.localStorage.setItem("pokemon", pokedexString)
  };
// funções para context 

  function nextPageHome () {
    if(contador <= 40){
    setNextPage(nextPage + 21)
    setContador(contador + 1)
    }
  }
  function backPageHome () {
    if(contador >= 1){
    setNextPage(nextPage - 21)
    setContador(contador - 1)
    }
  }
  function backInicio () {
    if(contador >= 1){
    setNextPage(nextPage === 21)
    setContador(1)
    }
  }
  function nextFinal () {
    if(contador >= 1){
    const final = 849
    setNextPage(final)
    setContador(41)
    }
  }
  function openModalCapturar(){
    setModalOpen(true)
  }
  function closeModalCapturar(){
    setModalOpen(false)
  }
  const customStyle = {
    content : {
      top: '50%',
      left: '50%',
      bottom: 'auto',
      right: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      borderRadius: '12px',
    }
  }

  const context = {
    pokedex,
    cardTop,
    setCardTop,
    setPokedex,
    addToPokedex,
    removeFromPokedex,
    modalOpen,
    closeModalCapturar,
    customStyle,
    flow,
    setFlow,
    nextPageHome,
    backPageHome,
    contador,
    nextPage,
    openModalCapturar,
    backInicio,
    nextFinal,
    setModalOpen
  }
  return (
    <div className="App">
      <GlobalContext.Provider value={context} >
        <Router />
      </GlobalContext.Provider>
    </div>
  )

}


export default App
