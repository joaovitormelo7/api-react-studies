import { Box, Button, FormControl, Input, InputLabel, MenuItem, Select, TextField, Typography }from "@mui/material";
import { useEffect, useState } from "react";
import http from "../../../http";
import ITag from "../../../interfaces/ITag";

const FormularioPrato = () => {
  
  const [nomePrato, setNomePrato] = useState("");
  const [descricao, setDescricao] = useState("");
  
  const [tags, setTags] = useState<ITag[]>([])

  
  useEffect(() => {
        http.get< { tags: ITag[] } >('tags/')
        .then(resposta => setTags(resposta.data.tags))
  }, [])
  
  const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault() 
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        flexGrow: 1,
      }}
    >
      <Typography component="h1" variant="h6">
        Formulário de Pratos
      </Typography>
      <Box component="form" sx={{ width: "100%" }} onSubmit={aoSubmeterForm}>
        <TextField
          value={nomePrato}
          onChange={(evento) => setNomePrato(evento.target.value)}
          label="Nome do Prato"
          variant="standard"
          fullWidth
          required
          margin="dense"
        />
        <TextField
          value={nomePrato}
          onChange={(evento) => setNomePrato(evento.target.value)}
          label="Descrição do Prato"
          variant="standard"
          fullWidth
          required
          margin="dense"
        />

        <FormControl margin="dense" fullWidth >
          <InputLabel id="select-tag">Tag</InputLabel>
          <Select labelId="select-tag" >
              {tags.map(tag => <MenuItem key={tag.id} value={tag.id}>
                  {tag.value}
              </MenuItem>)}
          </Select>
        </FormControl>

        <Button
          sx={{ marginTop: 1 }}
          type="submit"
          fullWidth
          variant="outlined"
        >
          Salvar
        </Button>
      </Box>
    </Box>
  );
};

export default FormularioPrato;
