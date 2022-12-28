import React, { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import Header from '../Header/Header'
import CardDetalhes from '../CardDetalhes/CardDetalhes'
import { ContainerPrincipal, TituloDetalhes, ModalCapturar2 } from './Detalhes.styled'
import { GlobalContext } from '../../contexts/GlobalContext'
import Modal from 'react-modal'
import axios from 'axios'
import { BASE_URL } from '../../constants/url'

const Detalhes = () => {
  const context = useContext(GlobalContext)
  const { closeModalCapturar, modalOpen, customStyle, flow } = context
  const { id } = useParams()
  const [details, setDetails] = useState()
  const [typeDetalhes, setTypeDetalhes] = useState([])
  const [typeDetalhes2, setTypeDetalhes2] = useState([])
  const [base, setBase] = useState([])
  const [isLoading, setIsLoading] = useState(false)


  const fetchDetalhes = async () => {
    try{
    setIsLoading(true)
    const APIResponse = await axios.get(`${BASE_URL}${id}`)
    setDetails(APIResponse.data)
    }
    catch(error){

    }
    setIsLoading(false)
  }

  useEffect(() => {
    fetchDetalhes()
  },[])
  const typeEbase = async () => {
    if(details){
      setTypeDetalhes(details['types']['0'].type?.['name'])
      setTypeDetalhes2(details.types[1]?.type?.['name'])
      setBase(details['stats'])
      }
  }
  useEffect(()=>{
    typeEbase()
  },[details])

  return (
    <>
      <Header isDetalhes={true} details={details} />
      <ContainerPrincipal>
        <TituloDetalhes><h2>Detalhes</h2></TituloDetalhes>
        {details && <CardDetalhes isLoading={isLoading} base={base} details={details} typeDetalhes={typeDetalhes} typeDetalhes2={typeDetalhes2} />}
      </ContainerPrincipal>
      <Modal
        bodyOpenClassName={"modalClasse"}
        isOpen={modalOpen}
        onRequestClose={closeModalCapturar}
        style={customStyle}
        ariaHideApp={false}
      >
        {flow === 1 &&
          <ModalCapturar2>
            <h1>Gotcha!</h1>
            <p>O Pokémon foi adicionado a sua Pokédex</p>
          </ModalCapturar2>}
        {flow === 2 &&
          <ModalCapturar2>
            <h1>Oh, no</h1>
            <p>O Pokémon foi removido da sua Pokédex</p>
          </ModalCapturar2>}
      </Modal>
    </>
  )
}

export default Detalhes