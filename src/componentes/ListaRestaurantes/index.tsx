import { useEffect, useState } from 'react';
import IRestaurante from '../../interfaces/IRestaurante';
import style from './ListaRestaurantes.module.scss';
import Restaurante from './Restaurante';
import axios from 'axios';
import { IPaginacao } from '../../interfaces/IPaginacao';

const ListaRestaurantes = () => {

  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])
  const [proximaPagina, setProximaPagina] = useState('')
  const [paginaAnterior, setPaginaAnterior] = useState('')

  const carregarDados = (url: string) => {
    if(!url) return;

    axios.get<IPaginacao<IRestaurante>>(url)
    .then(resposta => {
      console.log('resposta do api:', resposta.data)
      setRestaurantes(resposta.data.results)
      setProximaPagina(resposta.data.next)
      setPaginaAnterior(resposta.data.previous)
    })
    .catch(erro => {
      console.log(erro)
    })
  }
  

  useEffect(() => {
    carregarDados('http://localhost:8000/api/v2/restaurantes/')
  }, [])

  return (<section className={style.ListaRestaurantes}>
    <h1>Os restaurantes mais <em>bem avaliados do país</em>!</h1>
    {restaurantes?.map(item => <Restaurante restaurante={item} key={item.id} />)}
    {<button 
        onClick={() => carregarDados(paginaAnterior)} 
        disabled={!paginaAnterior}>
            Página anterior
    </button>}
    {<button 
        onClick={() => carregarDados(proximaPagina)} 
        disabled={!proximaPagina}>
            Próxima página
    </button>}
  </section>)
}

export default ListaRestaurantes