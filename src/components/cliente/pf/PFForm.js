import {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import BlankCard from '../../../components/shared/BlankCard';
import Button from '@mui/material/Button';
import {savePFData, deletePF, getEmpresaData} from '../../../api/Api';
import { useNavigate } from "react-router-dom";
import { Typography } from '@mui/material';
import { toast } from 'react-toastify';
import EmpresaSelect from '../EmpresaSelect';

const PFForm = ({handleOpen, handleClose, setRows,
    setLoading, edit, setEdit, erase, setErase, selectedPF, setSelectedPF}) => {
    const navigate = useNavigate();
        const [form, setForm] = useState({
            clienteNome: '',
            clienteCPF: '',
            clienteTelefone: '',
            clienteEmail: '',
            clienteEndereco: '',
            clienteNumero: '',
            clienteBairro: '',
            clienteCidade: '',
            clienteUF: '',
            clienteCEP: '',
            empresa: {empresaId: ''},
    })
    const [empresa, setEmpresa] = useState('')
    const [listaEmpresas, setListaEmpresas] = useState([])
    
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
        console.log(form)
        savePFData(form)
            .then((response) => {
                setRows([])
                setLoading(true)
                // setEdit(false)
                // setErase(false)
                handleClose()
                toast.success('Cliente PF salvo com sucesso!')
            })
            .catch((error) => {
                console.log(error)
                toast.error(`${error.response.data}`)
            })
    }

    const handleOnChangeNome = (event) => {
        setForm({...form, clienteNome: event.target.value});
    }
    
    const handleOnChangeCPF = (event) => {
        setForm({...form, clienteCPF: event.target.value});
    }
    
    const handleOnChangeTelefone = (event) => {
        setForm({...form, clienteTelefone: event.target.value});
    }
    
    const handleOnChangeEmail = (event) => {
        setForm({...form, clienteEmail: event.target.value});
    }
    
    const handleOnChangeEndereco = (event) => {
        setForm({...form, clienteEndereco: event.target.value});
    }
    
    const handleOnChangeNumero = (event) => {
        setForm({...form, clienteNumero: event.target.value});
    }
    
    const handleOnChangeBairro = (event) => {
        setForm({...form, clienteBairro: event.target.value});
    }
    
    const handleOnChangeCidade = (event) => {
        setForm({...form, clienteCidade: event.target.value});
    }
    
    const handleOnChangeUF = (event) => {
        setForm({...form, clienteUF: event.target.value});
    }
    
    const handleOnChangeCEP = (event) => {
        setForm({...form, clienteCEP: event.target.value});
    }
    
    const handleOnChangeEmpresa = (empresaId) => {
        setForm({...form, empresa: empresaId});
    }
        
    
    const handleSim = (pf) => {
        deletePF(pf)
            .then((response) => {
                setRows([])
                setLoading(true)
                setSelectedPF({})
                handleClose()
                toast.success('Cliente PF apagado com sucesso!')
            })
            .catch((error) => {
                console.log(error);
                toast.error(`${error.response.data}`)
            })
    }

    const handleNao = () => {
        console.log('close')
        setRows([])
        setSelectedPF({})
        setLoading(true)
        handleClose()
    }

    useEffect(()=> {
        getEmpresaData()
      .then((response) => {
          setListaEmpresas(response.data.content);
      })
      .catch((error) => {
          toast.error(`Não foi possível encontrar empresas: ${error.response.data}`)
          console.log("Erro ao recuperar dados. " + error);
      });
        
        if (selectedPF) {
            console.log(selectedPF)
            setEmpresa(selectedPF.empresa.empresaId)
            setForm({
                clienteId: selectedPF.clienteId,
                clienteNome: selectedPF.clienteNome,
                clienteCPF: selectedPF.clienteCPF,
                clienteTelefone: selectedPF.clienteTelefone,
                clienteEmail: selectedPF.clienteEmail,
                clienteEndereco: selectedPF.clienteEndereco,
                clienteNumero: selectedPF.clienteNumero,
                clienteBairro: selectedPF.clienteBairro,
                clienteCidade: selectedPF.clienteCidade,
                clienteUF: selectedPF.clienteUF,
                clienteCEP: selectedPF.clienteCEP,
                empresa: selectedPF.empresa.empresaId,
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
                                Deseja realmente apagar o cliente PF:  {selectedPF.clienteNome}?
                            </Typography>
                            <Box sx={{display: 'flex', gap: 5}}>
                                <Button variant='contained' color='error' onClick={() => handleSim(selectedPF)} >Sim</Button>
                                <Button variant='contained' onClick={() => handleNao()}>Não</Button>
                            </Box>
                        </>

                    ): (
                    <>
                    <TextField value={form.clienteNome} onChange={handleOnChangeNome} sx={{width:'300px'}} id='clienteNome' name='clienteNome' label="Nome" />
                    <TextField value={form.clienteTelefone} onChange={handleOnChangeTelefone} sx={{width:'300px'}} id='clienteNome' name='clienteNome' label="Telefone" />
                    <TextField value={form.clienteCPF} onChange={handleOnChangeCPF} sx={{width:'300px'}} id='clienteCPF' name='clienteCPF' label="CPF" />
                    <TextField value={form.clienteEmail} onChange={handleOnChangeEmail} sx={{width:'300px'}} id='clienteEmail' name='clienteEmail' label="Email" />
                    <TextField value={form.clienteEndereco} onChange={handleOnChangeEndereco} sx={{width:'300px'}} id='clienteEndereco' name='clienteEndereco' label="Endereço" />
                    <TextField value={form.clienteNumero} onChange={handleOnChangeNumero} sx={{width:'300px'}} id='clienteNumero' name='clienteNumero' label="Número" />
                    <TextField value={form.clienteBairro} onChange={handleOnChangeBairro} sx={{width:'300px'}} id='clienteBairro' name='clienteBairro' label="Bairro" />
                    <TextField value={form.clienteCidade} onChange={handleOnChangeCidade} sx={{width:'300px'}} id='clienteCidade' name='clienteCidade' label="Cidade" />
                    <TextField value={form.clienteUF} onChange={handleOnChangeUF} sx={{width:'300px'}} id='clienteUF' name='clienteUF' label="UF" />
                    <TextField value={form.clienteCEP} onChange={handleOnChangeCEP} sx={{width:'300px'}} id='clienteCEP' name='clienteCEP' label="CEP" />
                    <EmpresaSelect handleOnChangeEmpresa={handleOnChangeEmpresa} empresa={empresa} setEmpresa={setEmpresa} listaEmpresas={listaEmpresas}/>
                    <Button sx={{margin: '20px'}} variant='contained' onClick={handleSave}>Atualizar</Button>
                    </>
                )
            }
            </Box>
        </BlankCard>
    );
}

export default PFForm;