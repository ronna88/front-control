import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { Button, Grid, InputLabel, TextField, ToggleButton, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import ClienteSelect from '../cliente/ClienteSelect';
import LocalSelect from '../cliente/LocalSelect';
import { toast } from 'react-toastify';
import { saveFechamento } from 'src/api/Api';
import { Label } from '@mui/icons-material';


   const style = {
      position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '40%',  // Reduz a largura total do modal para evitar sobreposição
    bgcolor: 'background.paper',
    border: '2px solid #dcdcdc',
    borderRadius: 6,
    boxShadow: 24,
    p: 4,
    display: 'flex',
    flexDirection: 'column',
    gap: '20px', // Espaçamento entre os elementos
    maxHeight: '90vh',
    overflowY: 'auto'
    };

const ModalForm = ({open, handleClose, edit, setEdit, form, listaClientes, setForm, setFechamentosCarregados}) => {
    const [listaLocais, setListaLocais] = useState()
    const [clientesSelecionados, setClientesSelecionados] = useState([]);

    useEffect(()=>{
        if(edit){
            // Edição do form, carregar dados
            console.log('edit')
            console.log(form)
        }
    },[edit])

    useEffect(() => {
       // console.log(form)
       // console.log(listaClientes)
    },[form, listaClientes])

    const handleSave = () => {
    // console.log(form)
    const formData = {
            ...form,
            clientesSelecionados
        };
    saveFechamento(formData)
      .then((response) => {
        handleClose();
        if(edit) {
          toast.success('Fechamento atualizado com sucesso !');
        } else {
          toast.success('Fechamento criado com sucesso !');
        }
        setEdit(false)
        setFechamentosCarregados(false)
      })
      .catch((error) => {
        console.log(error);
        toast.error(<>Erro ao criar fechamento!<br />
        {error.response?.data}
        </>);
        
      });

  };

  const handleOnChangeinicio = (event) => {
    setForm({ ...form, fechamentoInicioTemp: event.target.value });
    setForm({ ...form, fechamentoInicio: event.target.value+'T00:00:00' });
  };
  const handleOnChangeFinal = (event) => {
    setForm({ ...form, fechamentoFinalTemp: event.target.value });
    setForm({ ...form, fechamentoFinal: event.target.value+'T23:59:00' });
  };
  const toggleCliente = (clienteId) => {
        // Verifica se o cliente já está selecionado
        if (clientesSelecionados.includes(clienteId)) {
            // Remove o cliente da seleção
            setClientesSelecionados(clientesSelecionados.filter((id) => id !== clienteId));
        } else {
            // Adiciona o cliente à seleção
            setClientesSelecionados([...clientesSelecionados, clienteId]);
        }
    };

    return (
        <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                <Box sx={style}>
                    <Typography sx={{marginBottom: '2rem'}} id="modal-modal-title" variant="h3" component="h2">
                        Cadastrar novo Fechamento
                    </Typography>
                    <>
                        <InputLabel>Início:</InputLabel>
                        <TextField type='date' value={form.fechamentoInicioTemp} onChange={(event) => handleOnChangeinicio(event)} />

                        <InputLabel>Final:</InputLabel>
                        <TextField type='date' value={form.fechamentoFinalTemp} onChange={(event) => handleOnChangeFinal(event)}  sx={{paddingBottom:3}}/>

                        <Grid container spacing={2} justifyContent="center">
                    {(listaClientes || []).map((cliente) => (
                        <Grid item xs={3} key={cliente.clienteId} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <ToggleButton
                                value={cliente.clienteId}
                                selected={clientesSelecionados.includes(cliente.clienteId)}
                                onChange={() => toggleCliente(cliente.clienteId)}
                                sx={{
                                    width: '100%',
                                    height: '100px',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    border: 'none', // Remover a borda
                                    backgroundColor: clientesSelecionados.includes(cliente.clienteId) ? 'lightblue' : 'white',
                                    '&.Mui-selected': {
                                        backgroundColor: 'lightblue',
                                    },
                                    '&:hover': {
                                        backgroundColor: 'lightgray',
                                    },
                                    borderRadius: '6px',
                                    boxShadow: '0px 1px 3px rgba(0,0,0,0.2)', // Adiciona leve sombra
                                }}
                            >
                                {cliente.clienteNome}
                            </ToggleButton>
                        </Grid>
                    ))}
                </Grid>

                        
                        <Button sx={{ margin: '20px' }} variant="contained" onClick={handleSave}>
                            {edit ? 'Atualizar' : 'Salvar'}
                        </Button>
                    </>
                </Box>
            </Modal>
    )

}
export default ModalForm;