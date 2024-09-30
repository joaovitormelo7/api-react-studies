import { AppBar, Box, Button, Container, Toolbar, Typography, Link, Paper }from "@mui/material";
import { Outlet, Link as RouterLink } from "react-router-dom";



const PaginaBaseAdm = () => {
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
            {/*Conteudo da página*/}
            <Outlet />
          </Paper>
        </Container>
      </Box>
    </>
  );
};

export default PaginaBaseAdm;
