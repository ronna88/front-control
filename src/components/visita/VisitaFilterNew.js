    import { useEffect, useState } from 'react';
    import BlankCard from '../../components/shared/BlankCard';
    import Button from '@mui/material/Button';
    import Modal from '@mui/material/Modal';
    import Box from '@mui/material/Box';
    import {
        InputLabel,
        TextField,
        Typography
    } from '@mui/material';
    import VisitaForm from './VisitaForm';
    import FuncionarioSingleSelect from '../funcionario/FuncionarioSingleSelect';
import { getVisitasDataFiltro } from 'src/api/Api';
import ClienteSelect from '../cliente/ClienteSelect';

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

    const VisitaFilterNew = ({listaClientes, setListaClientes, listaFuncionarios,
        rows, setRows, loading, setLoading, listaLocais, setListaLocais,
        cliente, setCliente, funcionarios, setFuncionarios, local, setLocal, erase, setErase, filtro, setFiltro, setCarregado, carregado}) => {

        const [open, setOpen] = useState(false);
        const handleOpen = () => setOpen(true);
        const handleClose = () => setOpen(false);
        const [funcionarioSelecionado,setFuncionarioSelecionado] = useState();
        const [form, setForm] = useState({
            visitaInicio: "",
            visitaFinal: "",
            visitaDescricao: "",
            visitaRemoto: false,
            visitaValorProdutos: 0.00,
            visitaTotalAbono: 0.00,
            funcionarios: [],
            cliente: '',
            local: {localId: ''},
            visitaTotalHoras: 0.00,
        })

        const [dataInicio, setDataInicio] = useState();
        const [dataFinal, setDataFinal] = useState();


        const handleChangeInicio = (event) => {
            setFiltro({...filtro, visitaInicio: event.target.value})
        }
        const handleChangeFinal = (event) => {
            setFiltro({...filtro, visitaFinal: event.target.value})
        }

        const handleFiltroClick = () => {
            console.log('cliquei')
           
            getVisitasDataFiltro(filtro)
            .then((response) => {
                console.log('OK');
                //console.log(response.data.content)
                setRows(response.data)
            })
            .catch((error) => {
                console.log('deu ruim')
                console.log(error)
            })
        }
        
        useEffect(()=>{
            // console.log(filtro)
        },[filtro])
        useEffect(()=>{
             setFiltro({...filtro, cliente: form.cliente})
        },[form])



        return (
            <>
            <BlankCard >
                <Button sx={{margin: '20px'}} variant='contained' onClick={handleOpen}>Novo</Button>

                <div className='filtros'>
                    <ClienteSelect listaClientes={listaClientes} form={form} setForm={setForm} />

                    <FuncionarioSingleSelect listaFuncionarios={listaFuncionarios} filtro={filtro} setFiltro={setFiltro}/>
            
                    <InputLabel>Data de Início: </InputLabel>
                    <TextField type='date' onChange={handleChangeInicio} value={filtro.visitaInicio} />
                    
                    <InputLabel>Data de Fim: </InputLabel>
                    <TextField type='date' onChange={handleChangeFinal} value={filtro.visitaFinal} />

                    <Button sx={{margin: '20'}} variant='outlined' onClick={(event) => {handleFiltroClick(event)}}>Filtrar</Button>
                </div>

                
                
            </BlankCard>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                <Box sx={style}>
                    <Typography sx={{marginBottom: '2rem'}} id="modal-modal-title" variant="h3" component="h2">
                        Cadastrar nova visita
                    </Typography>
                    <VisitaForm listaClientes={listaClientes} setListaClientes={setListaClientes} listaFuncionarios={listaFuncionarios} form={form} setForm={setForm}
                        rows={rows} setRows={setRows} loading={loading} setLoading={setLoading} handleClose={handleClose} setFuncionarios={setFuncionarios}
                        erase={erase} setErase={setErase} cliente={cliente} setCliente={setCliente} setCarregado={setCarregado} carregado={carregado} />
                </Box>
            </Modal>
            </>
        
        )
    }

    export default VisitaFilterNew;