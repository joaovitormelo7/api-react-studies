import { Routes, Route } from 'react-router-dom';
import Home from './paginas/Home';
import VitrineRestaurantes from './paginas/VitrineRestaurantes';
import AdministracaoRestaurantes from './paginas/Administracao/Restaurantes/AdministracaoRestaurantes';
import FormularioRestaurante from './paginas/Administracao/Restaurantes/FormsRestaurante';
import PaginaBaseAdm from './paginas/Administracao/PaginaBaseAdm';
import AdmPratos from './paginas/Administracao/Pratos/AdmPratos';
import FormularioPrato from './paginas/Administracao/Pratos/FormsPratos';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/restaurantes" element={<VitrineRestaurantes />} />  
      <Route path='/admin' element={<PaginaBaseAdm />}> 
        <Route path="restaurantes" element={<AdministracaoRestaurantes />} />
        <Route path="restaurantes/novo" element={<FormularioRestaurante />} />
        <Route path="restaurantes/:id  " element={<FormularioRestaurante />} />

        <Route path="pratos" element={<AdmPratos />} />
        <Route path="pratos/novo" element={<FormularioPrato />} />
      </Route>
    </Routes>
  );
}

export default App;
