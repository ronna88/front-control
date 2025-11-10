import {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import BlankCard from '../../../components/shared/BlankCard';
import Button from '@mui/material/Button';
import {saveLocalData, deleteLocal} from '../../../api/Api';
// import { useNavigate } from "react-router-dom";
import { Typography } from '@mui/material';
import { toast } from 'react-toastify';

const LocalForm = ({handleOpen, handleClose, setRows,
    setLoading, edit, setEdit, erase, setErase, selectedLocal,
    setSelectedLocal, PJSelected, setPJSelected}) => {
    // const navigate = useNavigate();
        const [form, setForm] = useState({
            localNome: '',
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
        saveLocalData(PJSelected, form)
            .then((response) => {
                setRows([])
                setLoading(true)
                setEdit(false)
                setErase(false)
                handleClose()
                toast.success('Local salvo com sucesso!')
            })
            .catch((error) => {
                console.log(error)
                toast.error(`${error.response.data}`)
            })
    }

    const handleOnChangeNome = (event) => {
        setForm({...form, localNome: event.target.value});
    }
            
    
    const handleSim = (local) => {
        deleteLocal(PJSelected, local.localId)
            .then((response) => {
                setRows([])
                setLoading(true)
                // setPJSelected({})
                setSelectedLocal({})
                handleClose()
                toast.success('Local apagado com sucesso!')
            })
            .catch((error) => {
                console.log(error);
                toast.error(`${error.response.data}`)
            })
    }

    const handleNao = () => {
        console.log('close')
        setRows([])
        setPJSelected({})
        setSelectedLocal({})
        setLoading(true)
        handleClose()
    }

    useEffect(()=> {
        if (selectedLocal) {
            setForm({
                localId: selectedLocal.localId,
                localNome: selectedLocal.localNome,
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
                                Deseja realmente apagar o Local:  {selectedLocal.localNome}?
                            </Typography>
                            <Box sx={{display: 'flex', gap: 5}}>
                                <Button variant='contained' color='error' onClick={() => handleSim(selectedLocal)} >Sim</Button>
                                <Button variant='contained' onClick={() => handleNao()}>Não</Button>
                            </Box>
                        </>

                    ): (
                    <>
                    <TextField value={form.localNome} onChange={handleOnChangeNome} sx={{width:'300px'}} id='localNome' name='localNome' label="Nome" />
                    <Button sx={{margin: '20px'}} variant='contained' onClick={handleSave}>{edit ? 'Atualizar' : 'Salvar'}</Button>
                    </>
                )
            }
            </Box>
        </BlankCard>
    );
}

export default LocalForm;