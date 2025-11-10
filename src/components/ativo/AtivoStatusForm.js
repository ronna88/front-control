import {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
// import TextField from '@mui/material/TextField';
import BlankCard from '../../components/shared/BlankCard';
import Button from '@mui/material/Button';
import {saveAtivoStatusData} from '../../api/Api';
// import { useNavigate } from "react-router-dom";
import { MenuItem, Select } from '@mui/material';
import { toast } from 'react-toastify';

const AtivoStatusForm = ({handleOpen, handleClose, setRows,
    setLoading, edit, setEdit, erase, setErase, selectedAtivo, setSelectedAtivo}) => {
    // const navigate = useNavigate();
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
        saveAtivoStatusData(form)
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

    const handleOnChangeStatus = (event) => {
        setForm({...form, ativoStatus: event.target.value});
    }
    
    /*
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
    }*/ 

    useEffect(()=> {
        if (selectedAtivo) {
            setForm({
                ativoId: selectedAtivo.ativoId,
                ativoDescricao: selectedAtivo.ativoDescricao,
                ativoValorCompra: selectedAtivo.ativoValorCompra,
                ativoValorLocacao: selectedAtivo.ativoValorLocacao,
                ativoPatrimonio: selectedAtivo.ativoPatrimonio,
                ativoStatus: selectedAtivo.ativoStatus
            })
        }
    },[])
    
    
    return (
        <BlankCard>
            <Box sx={style}>
                {
                    (
                    <>
                    <Select value={form.ativoStatus} onChange={handleOnChangeStatus}>
                        <MenuItem value={'DISPONÍVEL'}>DISPONÍVEL</MenuItem>
                        <MenuItem value={'LABORATÓRIO'}>LABORATÓRIO</MenuItem>
                        <MenuItem value={'ALUGADO'}>ALUGADO</MenuItem>
                        <MenuItem value={'VENDIDO'}>VENDIDO</MenuItem>
                    </Select>
                        <Button sx={{margin: '20px'}} variant='contained' onClick={handleSave}>{(edit ? 'Atualizar' : 'Salvar' )}</Button>
                    </>
                )
            }
            </Box>
        </BlankCard>
    );
}

export default AtivoStatusForm;