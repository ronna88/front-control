import {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import BlankCard from '../../components/shared/BlankCard';
import Button from '@mui/material/Button';
import {saveContratoData, deleteContrato} from '../../api/Api';
import { useNavigate } from "react-router-dom";
import { Typography } from '@mui/material';
import { toast } from 'react-toastify';

const ContratoForm = ({handleOpen, handleClose, setRows,
    setLoading, edit, setEdit, erase, setErase, selectedContrato, setSelectedContrato}) => {
    const navigate = useNavigate();
        const [form, setForm] = useState({
            contratoDescricao: '',
            contratoValorVisita: '',
            contratoValorRemoto: '',
            cliente: '',
            listaAtivos: [],
    })
    
    const style = {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        alignItems: 'center',
        justifyItems:'center',
        width: '100%',
        paddingTop: '20px'
    };
    
    const handleSave = () => {
        setForm({...form, contratoStatus: 'ATIVO'})
        saveContratoData(form)
            .then((response) => {
                setRows([])
                setLoading(true)
                setEdit(false)
                setErase(false)
                handleClose()
                toast.success('Contrato salvo com sucesso!')
            })
            .catch((error) => {
                console.log(error)
                toast.error(`${error.response.data}`)
            })
    }

    const handleOnChangeDescricao = (event) => {
        setForm({...form, contratoDescricao: event.target.value});
    }
    
    const handleOnChangeValorVisita = (event) => {
        setForm({...form, contratoValorVisita: event.target.value});
    }
    
    const handleOnChangeValorRemoto = (event) => {
        setForm({...form, contratoValorRemoto: event.target.value});
    }
    
    //Single Select
    const handleOnChangeCliente = (event) => {
        setForm({...form, cliente: event.target.value});
    }
    
    // MultiSelect
    const handleOnChangeAtivo = (event) => {
        setForm({...form, listaAtivos: event.target.value});
    }
    
    
    const handleSim = (contrato) => {
        deleteContrato(contrato)
            .then((response) => {
                setRows([])
                setLoading(true)
                setSelectedContrato()
                handleClose()
                toast.success('Contrato apagado com sucesso!')
            })
            .catch((error) => {
                console.log(error);
                toast.error(`${error.response.data}`)
            })
    }

    const handleNao = () => {
        console.log('close')
        setRows([])
        setSelectedContrato()
        setLoading(true)
        handleClose()
    }

    useEffect(()=> {
        if (selectedContrato) {
            setForm({
                contratoId: selectedContrato.contratoId,
                contratoDescricao: selectedContrato.contratoDescricao,
                contratoValorVisita: selectedContrato.contratoValorVisita,
                contratoValorRemoto: selectedContrato.contratoValorRemoto,
                cliente: selectedContrato.cliente,
                listaAtivos: selectedContrato.listaAtivos,
                
            })
        }
    },[])
    
    
    return (
        <BlankCard>
            <Box sx={style}>
                {erase ?
                    (
                        <>
                            <Typography variant="h3" component="h3" sx={{marginBottom: '10px'}}>
                                Deseja realmente apagar o contrato:  {selectedContrato.contratoDescricao}?
                            </Typography>
                            <Box sx={{display: 'flex', gap: 5}}>
                                <Button variant='contained' color='error' onClick={() => handleSim(selectedContrato)} >Sim</Button>
                                <Button variant='contained' onClick={() => handleNao()}>Não</Button>
                            </Box>
                        </>

                    ): (
                    <>
                    <TextField value={form.contratoDescricao} onChange={handleOnChangeDescricao} sx={{width:'300px'}} id='contratoDescricao' name='contratoDescricao' label="Descrição" />
                    <TextField value={form.contratoValorVisita} onChange={handleOnChangeValorVisita} sx={{width:'300px'}} id='contratoValorVisita' name='contratoValorVisita' label="Valor da Visita" />
                    <TextField value={form.contratoValorRemoto} onChange={handleOnChangeValorRemoto} sx={{width:'300px'}} id='contratoValorRemoto' name='contratoValorRemoto' label="Valor do Remoto" />
                        <TextField value={form.cliente} onChange={handleOnChangeCliente} sx={{width:'300px'}} id='empresaEndereco' name='empresaEndereco' label="Cliente" />
                        <TextField value={form.listaAtivos} onChange={handleOnChangeAtivo} sx={{width:'300px'}} id='listaAtivos' name='listaAtivos' label="Ativos" />
                        <Button sx={{margin: '20px'}} variant='contained' onClick={handleSave}>{(edit ? 'Atualizar' : 'Salvar' )}</Button>
                    </>
                )
            }
            </Box>
        </BlankCard>
    // TODO: criar select para cliente, e criar multiselect para ativos
    );
}

export default ContratoForm;