import {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import BlankCard from '../../components/shared/BlankCard';
import Button from '@mui/material/Button';
import {saveAtivoData, deleteAtivo} from '../../api/Api';
import { useNavigate } from "react-router-dom";
import { Typography } from '@mui/material';
import { toast } from 'react-toastify';

const AtivoForm = ({handleOpen, handleClose, setRows,
    setLoading, edit, setEdit, erase, setErase, selectedAtivo, setSelectedAtivo}) => {
    const navigate = useNavigate();
        const [form, setForm] = useState({
            ativoDescricao: '',
            ativoPatrimonio: '',
            ativoValorCompra: '',
            ativoValorLocacao: '',
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
        setForm({...form, ativoStatus: 'ATIVO'})
        saveAtivoData(form)
            .then((response) => {
                setRows([])
                setLoading(true)
                setEdit(false)
                setErase(false)
                handleClose()
                toast.success('Ativo salvo com sucesso!')
            })
            .catch((error) => {
                console.log(error)
                toast.error(`${error.response.data.message}`)
            })
    }

    const handleOnChangeDescricao = (event) => {
        setForm({...form, ativoDescricao: event.target.value});
    }

    const handleOnChangePatrimonio = (event) => {
        setForm({...form, ativoPatrimonio: event.target.value});
    }
    
    const handleOnChangeValorCompra = (event) => {
        setForm({...form, ativoValorCompra: event.target.value});
    }
    
    const handleOnChangeValorLocacao = (event) => {
        setForm({...form, ativoValorLocacao: event.target.value});
    }
    
    const handleSim = (ativo) => {
        deleteAtivo(ativo.ativoId)
            .then((response) => {
                setRows([])
                setLoading(true)
                setSelectedAtivo()
                handleClose()
                toast.success('Ativo apagada com sucesso!')
            })
            .catch((error) => {
                console.log(error);
                toast.error(`${error.response.data}`)
            })
    }

    const handleNao = () => {
        console.log('close')
        setRows([])
        setSelectedAtivo()
        setLoading(true)
        handleClose()
    }

    useEffect(()=> {
        if (selectedAtivo) {
            setForm({
                ativoId: selectedAtivo.ativoId,
                ativoDescricao: selectedAtivo.ativoDescricao,
                ativoValorCompra: selectedAtivo.ativoValorCompra,
                ativoValorLocacao: selectedAtivo.ativoValorLocacao,
                ativoPatrimonio: selectedAtivo.ativoPatrimonio,
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
                                Deseja realmente apagar o ativo:  {selectedAtivo.ativoDescricao}?
                            </Typography>
                            <Box sx={{display: 'flex', gap: 5}}>
                                <Button variant='contained' color='error' onClick={() => handleSim(selectedAtivo)} >Sim</Button>
                                <Button variant='contained' onClick={() => handleNao()}>Não</Button>
                            </Box>
                        </>

                    ): (
                    <>
                    <TextField value={form.ativoDescricao} onChange={handleOnChangeDescricao} sx={{width:'300px'}} id='ativoDescricao' 
                        name='ativoDescricao' label="Descrição" />
                    <TextField value={form.ativoPatrimonio} onChange={handleOnChangePatrimonio} sx={{width:'300px'}} 
                        id='ativoPatrimonio' name='ativoPatrimonio' label="Patrimônio" />
                    <TextField value={form.ativoValorCompra} onChange={handleOnChangeValorCompra} sx={{width:'300px'}} 
                        id='ativoValorCompra' name='ativoValorCompra' label="Valor de Compra" />
                    <TextField value={form.ativoValorLocacao} onChange={handleOnChangeValorLocacao} sx={{width:'300px'}} 
                        id='ativoValorLocacao' name='ativoValorLocacao' label="Valor de Locação" />
                        <Button sx={{margin: '20px'}} variant='contained' onClick={handleSave}>{(edit ? 'Atualizar' : 'Salvar' )}</Button>
                    </>
                )
            }
            </Box>
        </BlankCard>
    );
}

export default AtivoForm;