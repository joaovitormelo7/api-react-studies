import { useEffect, useState } from "react"
import IRestaurante from "../../../interfaces/IRestaurante"
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from "@mui/material"
import axios from "axios"
import { Link } from "react-router-dom"
import ListaRestaurantes from "../../../componentes/ListaRestaurantes"

const AdministracaoRestaurantes = () => {

    const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])

    useEffect(() =>{
        axios.get<IRestaurante[]>('http://localhost:8000/api/v2/restaurantes/')
            .then(resposta => setRestaurantes(resposta.data))
    }, [])
    
    const excluir = (restauranteExclusao: IRestaurante) => {
        axios.delete(`http://localhost:8000/api/v2/restaurantes/${restauranteExclusao.id}/`)
            .then(() => {
                const restauranteFilter = restaurantes.filter(restaurante => restaurante.id !== restauranteExclusao.id)
                setRestaurantes([ ...restauranteFilter ])
            })
    }

    return(
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            Nome
                        </TableCell>
                        <TableCell>
                            Editar
                        </TableCell>
                        <TableCell>
                            Excluir
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {restaurantes.map(restaurante =><TableRow key={restaurante.id}>
                        <TableCell>
                            {restaurante.nome}
                        </TableCell>
                        <TableCell>
                            <Link to={`/admin/restaurantes/${restaurante.id}`}>editar</Link>
                        </TableCell>
                        <TableCell>
                            <Button variant="outlined" color="error" onClick={() => excluir(restaurante)}>
                                Excluir
                            </Button>
                        </TableCell>
                    </TableRow> 
                    )}
                    
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default AdministracaoRestaurantes