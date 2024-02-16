import {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import BlankCard from '../../components/shared/BlankCard';
import Button from '@mui/material/Button';
import {saveEmpresaData} from '../../api/Api';
import { useNavigate } from "react-router-dom";

const EmpresaForm = ({handleOpen, handleClose, setRows, setLoading, edit, setEdit, erase, setErase, empresa}) => {
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
        saveEmpresaData(form)
            .then((response) => {
                console.log(response);
                setRows([])
                setLoading(true)
                setEdit(false)
                setErase(false)
                handleClose()
            })
            .catch((error) => {
            console.log(error);
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
    
    useEffect(()=> {
        console.log("edit: " + edit)
        console.log("erase: " + erase)
        if(edit) {
            console.log('editar formulario')
        }
        if(erase) {
            console.log('deletar formulario')
        }
    },[])
    
    
    return (
        <BlankCard>
            <Box sx={style}>
                {erase ? `Deseja realmente apagar a empresa x`: (
                    <>
                        <TextField onChange={handleOnChangeNomeFantasia} sx={{width:'300px'}} id='nomeFantasia' name='nomeFantasia' label="Nome Fantasia" />
                        <TextField onChange={handleOnChangeCnpj} sx={{width:'300px'}} id='cnpj' name='cnpj' label="CNPJ" />
                        <TextField onChange={handleOnChangeIe} sx={{width:'300px'}} id='inscricaoEstadual' name='nomeFantainscricaoEstadualsia' label="Inscrição Estadual" />
                        <TextField onChange={handleOnChangeEndereco} sx={{width:'300px'}} id='endereco' name='endereco' label="Endereço" />
                        <TextField onChange={handleOnChangeEmail} sx={{width:'300px'}} id='email' name='email' label="Email" />
                        <TextField onChange={handleOnChangeTelefone} sx={{width:'300px'}} id='telefone' name='telefone' label="Telefone" />
                        <Button sx={{margin: '20px'}} variant='contained' onClick={handleSave}>Salvar</Button>
                    </>
                )
            }
            </Box>
        </BlankCard>
    );
}

export default EmpresaForm;