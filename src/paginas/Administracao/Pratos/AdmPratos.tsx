import { useEffect, useState } from "react";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom"
import http from "../../../http";
import IPrato from "../../../interfaces/IPrato";

const AdmPratos = () => {
  const [pratos, setPratos] = useState<IPrato[]>([]);

  useEffect(() => {
    http.get<IPrato[]>("pratos/").then((resposta) => setPratos(resposta.data));
  }, []);

  const excluir = (pratoExclusao: IPrato) => {
    http.delete(`pratos/${pratoExclusao.id}/`).then(() => {
      const pratosFilter = pratos.filter(
        (prato) => prato.id !== pratoExclusao.id
      );
      setPratos([...pratosFilter]);
    });
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>Tag</TableCell>
            <TableCell>Imagem</TableCell>
            <TableCell>Editar</TableCell>
            <TableCell>Excluir</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {pratos.map((prato) => (
            <TableRow key={prato.id}>
              <TableCell>{prato.nome}</TableCell>
              <TableCell>{prato.tag}</TableCell>
              <TableCell>
                    [<a href={prato.imagem} target=" blank" rel="noreferrer">Ver imagem</a>]
                </TableCell>
              <TableCell>
                <RouterLink to={`/admin/restaurantes/${prato.id}`}>
                  editar
                </RouterLink>
              </TableCell>
              <TableCell>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => excluir(prato)}
                >
                  Excluir
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AdmPratos;
