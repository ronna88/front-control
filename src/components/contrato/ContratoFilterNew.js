import {useState} from 'react';
import BlankCard from '../../components/shared/BlankCard';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

import {
    Typography
} from '@mui/material';
import ContratoForm from './ContratoForm';

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

const ContratoFilterNew = ({setRows, setLoading, listaClientes, setListaClientes,
    listaAtivos, setListaAtivos, cliente, setCliente, ativos, setAtivos}) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
        <BlankCard >
            <Button sx={{margin: '20px'}} variant='contained' onClick={handleOpen}>Novo</Button>
        </BlankCard>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
            <Box sx={style}>
                <Typography sx={{marginBottom: '2rem'}} id="modal-modal-title" variant="h3" component="h2">
                    Cadastrar novo contrato
                </Typography>
                <ContratoForm handleOpen={handleOpen} handleClose={handleClose} setRows={setRows} setLoading={setLoading}
                    listaClientes={listaClientes} setListaClientes={setListaClientes}
                    listaAtivos={listaAtivos} setListaAtivos={setListaAtivos} cliente={cliente} setCliente={setCliente}
                    ativos={ativos} setAtivos={setAtivos}/>
            </Box>
        </Modal>
        </>
    
    )
}

export default ContratoFilterNew;