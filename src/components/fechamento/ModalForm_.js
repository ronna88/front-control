import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { Button, InputLabel, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import ClienteSelect from '../cliente/ClienteSelect';
import LocalSelect from '../cliente/LocalSelect';
import { toast } from 'react-toastify';
import { saveFechamento } from 'src/api/Api';


   const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '50%',
        bgcolor: 'background.paper',
        border: '2px solid #dcdcdc',
        borderRadius: 6,
        boxShadow: 24,
        p: 4,
        display: 'flex',
        flexDirection: 'column',
        gap: '3px',
    };

const ModalForm = ({open, handleClose, edit, setEdit, form, listaClientes, setForm, setFechamentosCarregados}) => {
    const [listaLocais, setListaLocais] = useState()

    useEffect(()=>{
        if(edit){
            // Edição do form, carregar dados
            console.log('edit')
            console.log(form)
        }
    },[edit])

    useEffect(() => {
       // console.log(form)
    },[form])

    const handleSave = () => {
    // console.log(form)
    
    saveFechamento(form)
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
        toast.error('Erro ao criar fechamento !');
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
                        <TextField type='date' value={form.fechamentoFinalTemp} onChange={(event) => handleOnChangeFinal(event)} />

                        <ClienteSelect listaClientes={listaClientes} setForm={setForm} form={form}/>

                        {form.cliente !== '' && form.cliente !== -1 ? 
                            (<LocalSelect form={form} setForm={setForm} />) : ''
                        }
                        <Button sx={{ margin: '20px' }} variant="contained" onClick={handleSave}>
                            {edit ? 'Atualizar' : 'Salvar'}
                        </Button>
                    </>
                </Box>
            </Modal>
    )

}
export default ModalForm;