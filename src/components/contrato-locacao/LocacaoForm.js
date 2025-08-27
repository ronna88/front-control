import { useEffect, useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from '@mui/material';
import { getClienteData } from '../../api/Api';
import { getAtivosDisponiveis } from '../../api/Api';
import { saveLocacaoData } from '../../api/Api';
import { toast } from 'react-toastify';

const LocacaoForm = ({ handleClose }) => {
  const [descricao, setDescricao] = useState('');
  const [clienteId, setClienteId] = useState('');
  const [clientes, setClientes] = useState([]);
  const [ativos, setAtivos] = useState([]);
  const [ativosSelecionados, setAtivosSelecionados] = useState([]);

  const handleAddAtivo = () => {
    setAtivosSelecionados([
      ...ativosSelecionados,
      {
        ativoId: '',
        valorMensal: '',
        dataEnvio: '',
        observacao: '',
      },
    ]);
  };

  const handleChangeAtivo = (index, field, value) => {
    const novosAtivos = [...ativosSelecionados];
    novosAtivos[index][field] = value;
    setAtivosSelecionados(novosAtivos);
  };

  const handleSubmit = async () => {
    const payload = {
      descricao,
      clienteId,
      ativosLocados: ativosSelecionados,
    };

    try {
      await saveLocacaoData(payload);
      toast.success('Contrato criado com sucesso!');
      handleClose?.();
    } catch (error) {
      toast.error(error.response?.data || 'Erro ao criar contrato.');
      console.error(error);
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const clienteResp = await getClienteData();
        console.log(clienteResp.data.content);
        setClientes('clienteResp', clienteResp.data.content);

        const ativoResp = await getAtivosDisponiveis();
        console.log(ativoResp.data.content);
        setAtivos(ativoResp.data.content);
      } catch (err) {
        toast.error('Erro ao carregar dados iniciais.');
      }
    }

    fetchData();
  }, []);

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <Typography variant="h5">Novo Contrato de Locação</Typography>

      <TextField
        label="Descrição do contrato"
        value={descricao}
        onChange={(e) => setDescricao(e.target.value)}
        fullWidth
      />

      <FormControl fullWidth>
        <InputLabel id="cliente-label">Cliente</InputLabel>
        <Select
          labelId="cliente-label"
          value={clienteId}
          onChange={(e) => setClienteId(e.target.value)}
        >
          {Array.isArray(clientes) &&
            clientes.map((c) => (
              <MenuItem key={c.clienteId} value={c.clienteId}>
                {c.clienteNome} ({c.clienteCNPJ})
              </MenuItem>
            ))}
        </Select>
      </FormControl>

      <Typography variant="h6">Ativos Selecionados</Typography>

      {ativosSelecionados?.map((ativo, idx) => (
        <Box key={idx} display="flex" flexDirection="column" gap={1}>
          <FormControl fullWidth>
            <InputLabel id={`ativo-${idx}`}>Ativo</InputLabel>
            <Select
              labelId={`ativo-${idx}`}
              value={ativo.ativoId}
              onChange={(e) => handleChangeAtivo(idx, 'ativoId', e.target.value)}
            >
              {ativos?.map((a) => (
                <MenuItem key={a.ativoId} value={a.ativoId}>
                  {a.ativoDescricao} - {a.ativoPatrimonio}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="Valor Mensal"
            type="number"
            value={ativo.valorMensal}
            onChange={(e) => handleChangeAtivo(idx, 'valorMensal', e.target.value)}
          />

          <TextField
            label="Data de Envio"
            type="datetime-local"
            InputLabelProps={{ shrink: true }}
            value={ativo.dataEnvio}
            onChange={(e) => handleChangeAtivo(idx, 'dataEnvio', e.target.value)}
          />

          <TextField
            label="Observação"
            value={ativo.observacao}
            onChange={(e) => handleChangeAtivo(idx, 'observacao', e.target.value)}
          />
        </Box>
      ))}

      <Button variant="outlined" onClick={handleAddAtivo}>
        Adicionar Ativo
      </Button>

      <Button variant="contained" onClick={handleSubmit}>
        Salvar Contrato
      </Button>
    </Box>
  );
};

export default LocacaoForm;
