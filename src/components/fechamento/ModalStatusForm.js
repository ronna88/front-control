import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { Button, Typography } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { editStatusFechamento } from 'src/api/Api';
import { Label } from '@mui/icons-material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '40%', // Reduz a largura total do modal para evitar sobreposição
  bgcolor: 'background.paper',
  border: '2px solid #dcdcdc',
  borderRadius: 6,
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  gap: '20px', // Espaçamento entre os elementos
  maxHeight: '90vh',
  overflowY: 'auto',
};

const ModalStatusForm = ({
  statusOpen,
  handleStatusClose,
  edit,
  setEdit,
  statusForm,
  setStatusFrom,
  setFechamentosCarregados,
}) => {
  useEffect(() => {
    if (edit) {
      // Edição do form, carregar dados
      console.log('edit');
      console.log(statusForm);
    }
  }, [edit]);

  const handleChange = (event) => {
    const tempStatus = event.target.value;
    setStatusFrom({ ...statusForm, fechamentoStatus: tempStatus });
  };

  const handleSave = () => {
    // console.log(form)
    const formData = {
      ...statusForm,
    };
    editStatusFechamento(formData, statusForm.fechamentoId)
      .then((response) => {
        handleStatusClose();
        if (edit) {
          toast.success('Fechamento atualizado com sucesso !');
        } else {
          toast.success('Fechamento criado com sucesso !');
        }
        setEdit(false);
        setFechamentosCarregados(false);
      })
      .catch((error) => {
        console.log(error);
        toast.error(
          <>
            Erro ao criar fechamento!
            <br />
            {error.response?.data}
          </>,
        );
      });
  };

  return (
    <Modal
      open={statusOpen}
      onClose={handleStatusClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography
          sx={{ marginBottom: '2rem' }}
          id="modal-modal-title"
          variant="h3"
          component="h2"
        >
          Mudar status do Fechamento
        </Typography>
        <>
          <FormControl sx={{ width: '100%' }}>
            <Select
              sx={{ padding: '10px', marginLeft: '10px', marginRight: '10px' }}
              labelId="status"
              id="status"
              value={statusForm?.fechamentoStatus}
              onChange={handleChange}
              size="small"
            >
              <MenuItem value={-1}>Selecione</MenuItem>
              <MenuItem value={'CRIADO'}>Criado</MenuItem>
              <MenuItem value={'APROVADO'}>Aprovado</MenuItem>
              <MenuItem value={'REPROVADO'}>Reprovado</MenuItem>
              <MenuItem value={'ENVIADO'}>Enviado</MenuItem>
              <MenuItem value={'ATRASADO'}>Atrasado</MenuItem>
              <MenuItem value={'PAGO'}>Pago</MenuItem>
            </Select>
          </FormControl>

          <Button sx={{ margin: '20px' }} variant="contained" onClick={handleSave}>
            {edit ? 'Atualizar' : 'Salvar'}
          </Button>
        </>
      </Box>
    </Modal>
  );
};
export default ModalStatusForm;
