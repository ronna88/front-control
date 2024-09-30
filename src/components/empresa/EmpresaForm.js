import {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import BlankCard from '../../components/shared/BlankCard';
import Button from '@mui/material/Button';
import {saveEmpresaData, deleteEmpresa} from '../../api/Api';
import { useNavigate } from "react-router-dom";
import { Typography } from '@mui/material';
import { toast } from 'react-toastify';

const EmpresaForm = ({handleOpen, handleClose, setRows,
    setLoading, edit, setEdit, erase, setErase, selectedEmpresa, setSelectedEmpresa}) => {
    const navigate = useNavigate();
        const [form, setForm] = useState({
            empresaNomeFantasia: '',
            empresaCNPJ: '',
            empresaInscricaoEstadual: '',
            empresaEndereco: '',
            empresaEmail: '',
            empresaTelefone: '',
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
        setForm({...form, empresaStatus: 'ATIVO'})
        saveEmpresaData(form)
            .then((response) => {
                setRows([])
                setLoading(true)
                // setEdit(false)
                // setErase(false)
                handleClose()
                toast.success('Empresa salva com sucesso!')
            })
            .catch((error) => {
                console.log(error)
                toast.error(`${error.response.data}`)
            })
    }

    const handleOnChangeNomeFantasia = (event) => {
        setForm({...form, empresaNomeFantasia: event.target.value});
    }
    
    const handleOnChangeCnpj = (event) => {
        setForm({...form, empresaCNPJ: event.target.value});
    }
    
    const handleOnChangeIe = (event) => {
        setForm({...form, empresaInscricaoEstadual: event.target.value});
    }
    
    const handleOnChangeEndereco = (event) => {
        setForm({...form, empresaEndereco: event.target.value});
    }
    
    const handleOnChangeEmail = (event) => {
        setForm({...form, empresaEmail: event.target.value});
    }
    
    const handleOnChangeTelefone = (event) => {
        setForm({...form, empresaTelefone: event.target.value});
    }
    
    const handleSim = (empresa) => {
        deleteEmpresa(empresa)
            .then((response) => {
                setRows([])
                setLoading(true)
                setSelectedEmpresa()
                handleClose()
                toast.success('Empresa apagada com sucesso!')
            })
            .catch((error) => {
                console.log(error);
                toast.error(`${error.response.data}`)
            })
    }

    const handleNao = () => {
        console.log('close')
        setRows([])
        setSelectedEmpresa()
        setLoading(true)
        handleClose()
    }

    useEffect(()=> {
        if (selectedEmpresa) {
            setForm({
                empresaId: selectedEmpresa.empresaId,
                empresaNomeFantasia: selectedEmpresa.empresaNomeFantasia,
                empresaCNPJ: selectedEmpresa.empresaCNPJ,
                empresaInscricaoEstadual: selectedEmpresa.empresaInscricaoEstadual,
                empresaEndereco: selectedEmpresa.empresaEndereco,
                empresaEmail: selectedEmpresa.empresaEmail,
                empresaTelefone: selectedEmpresa.empresaTelefone,
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
                                Deseja realmente apagar a empresa:  {selectedEmpresa.empresaNomeFantasia}?
                            </Typography>
                            <Box sx={{display: 'flex', gap: 5}}>
                                <Button variant='contained' color='error' onClick={() => handleSim(selectedEmpresa)} >Sim</Button>
                                <Button variant='contained' onClick={() => handleNao()}>Não</Button>
                            </Box>
                        </>

                    ): (
                    <>
                        <TextField value={form.empresaNomeFantasia} onChange={handleOnChangeNomeFantasia} sx={{width:'300px'}} id='empresaNomeFantasia' name='empresaNomeFantasia' label="Nome Fantasia" />
                        <TextField value={form.empresaCNPJ} onChange={handleOnChangeCnpj} sx={{width:'300px'}} id='empresaCNPJ' name='empresaCNPJ' label="CNPJ" />
                        <TextField value={form.empresaInscricaoEstadual} onChange={handleOnChangeIe} sx={{width:'300px'}} id='empresaInscricaoEstadual' name='empresaInscricaoEstadual' label="Inscrição Estadual" />
                        <TextField value={form.empresaEndereco} onChange={handleOnChangeEndereco} sx={{width:'300px'}} id='empresaEndereco' name='empresaEndereco' label="Endereço" />
                        <TextField value={form.empresaEmail} onChange={handleOnChangeEmail} sx={{width:'300px'}} id='empresaEmail' name='empresaEmail' label="Email" />
                        <TextField value={form.empresaTelefone} onChange={handleOnChangeTelefone} sx={{width:'300px'}} id='empresaTelefone' name='empresaTelefone' label="Telefone" />
                        <Button sx={{margin: '20px'}} variant='contained' onClick={handleSave}>Atualizar</Button>
                    </>
                )
            }
            </Box>
        </BlankCard>
    );
}

export default EmpresaForm;