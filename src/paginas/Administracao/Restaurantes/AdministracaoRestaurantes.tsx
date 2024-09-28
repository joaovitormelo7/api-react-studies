import { useEffect, useState } from "react";
import IRestaurante from "../../../interfaces/IRestaurante";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, AppBar, Box, Container, Toolbar, Typography, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom"
import http from "../../../http";

const AdministracaoRestaurantes = () => {
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);

  useEffect(() => {
    http
      .get<IRestaurante[]>("restaurantes/")
      .then((resposta) => setRestaurantes(resposta.data));
  }, []);

  const excluir = (restauranteExclusao: IRestaurante) => {
    http.delete(`restaurantes/${restauranteExclusao.id}/`).then(() => {
      const restauranteFilter = restaurantes.filter(
        (restaurante) => restaurante.id !== restauranteExclusao.id
      );
      setRestaurantes([...restauranteFilter]);
    });
  };

  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar>
            <Typography variant="h6">Administração</Typography>
            <Box sx={{ display: "flex", flexGrow: 1 }}>
              <Link component={RouterLink} to="/admin/restaurantes">
                <Button sx={{ my: 2, color: "white" }}>Restaurante</Button>
              </Link>
              <Link component={RouterLink} to="/admin/restaurantes/novo">
                <Button sx={{ my: 2, color: "white" }}>Novo Restaurante</Button>
              </Link>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Box>
        <Container maxWidth="lg" sx={{ mt: 1 }}>
          <Paper sx={{ px: 2 }}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Nome</TableCell>
                    <TableCell>Editar</TableCell>
                    <TableCell>Excluir</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {restaurantes.map((restaurante) => (
                    <TableRow key={restaurante.id}>
                      <TableCell>{restaurante.nome}</TableCell>
                      <TableCell>
                        <RouterLink to={`/admin/restaurantes/${restaurante.id}`}>
                          editar
                        </RouterLink>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="outlined"
                          color="error"
                          onClick={() => excluir(restaurante)}
                        >
                          Excluir
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Container>
      </Box>
    </>
  );
};

export default AdministracaoRestaurantes;
