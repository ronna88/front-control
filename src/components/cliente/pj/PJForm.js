import {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import BlankCard from '../../../components/shared/BlankCard';
import Button from '@mui/material/Button';
import {savePJData, deletePJ, getEmpresaData} from '../../../api/Api';
import { useNavigate } from "react-router-dom";
import { Typography } from '@mui/material';
import { toast } from 'react-toastify';
import EmpresaSelect from '../EmpresaSelect';

const PJForm = ({handleOpen, handleClose, setRows,
    setLoading, edit, setEdit, erase, setErase, selectedPJ, setSelectedPJ}) => {
    const navigate = useNavigate();
        const [form, setForm] = useState({
            clienteNome: '',
            clienteRazaoSocial: '',
            clienteInscricaoEstadual: '',
            clienteCNPJ: '',
            clienteTelefone: '',
            clienteEmail: '',
            clienteEndereco: '',
            clienteNumero: '',
            clienteBairro: '',
            clienteCidade: '',
            clienteUF: '',
            clienteCEP: '',
            empresa: '',
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
        savePJData(form)
            .then((response) => {
                setRows([])
                setLoading(true)
                // setEdit(false)
                // setErase(false)
                handleClose()
                toast.success('Cliente PJ salvo com sucesso!')
            })
            .catch((error) => {
                console.log(error)
                toast.error(`${error.response.data}`)
            })
    }

    const handleOnChangeNome = (event) => {
        setForm({...form, clienteNome: event.target.value});
    }
    
    const handleOnChangeRazaoSocial = (event) => {
        setForm({...form, clienteRazaoSocial: event.target.value});
    }
    
    const handleOnChangeInscricaoEstadual = (event) => {
        setForm({...form, clienteInscricaoEstadual: event.target.value});
    }
    
    const handleOnChangeCNPJ = (event) => {
        setForm({...form, clienteCNPJ: event.target.value});
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
        
    
    const handleSim = (pj) => {
        deletePJ(pj)
            .then((response) => {
                setRows([])
                setLoading(true)
                setSelectedPJ({})
                handleClose()
                toast.success('Cliente PJ apagado com sucesso!')
            })
            .catch((error) => {
                console.log(error);
                toast.error(`${error.response.data}`)
            })
    }

    const handleNao = () => {
        console.log('close')
        setRows([])
        setSelectedPJ({})
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
        
        if (selectedPJ) {
            console.log(selectedPJ)
            setEmpresa(selectedPJ.empresa.empresaId)
            setForm({
                clienteId: selectedPJ.clienteId,
                clienteRazaoSocial: selectedPJ.clienteRazaoSocial,
                clienteInscricaoEstadual: selectedPJ.clienteInscricaoEstadual,
                clienteNome: selectedPJ.clienteNome,
                clienteCNPJ: selectedPJ.clienteCNPJ,
                clienteTelefone: selectedPJ.clienteTelefone,
                clienteEmail: selectedPJ.clienteEmail,
                clienteEndereco: selectedPJ.clienteEndereco,
                clienteNumero: selectedPJ.clienteNumero,
                clienteBairro: selectedPJ.clienteBairro,
                clienteCidade: selectedPJ.clienteCidade,
                clienteUF: selectedPJ.clienteUF,
                clienteCEP: selectedPJ.clienteCEP,
                empresa: selectedPJ.empresa.empresaId,
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
                                Deseja realmente apagar o cliente PJ:  {selectedPJ.clienteNome}?
                            </Typography>
                            <Box sx={{display: 'flex', gap: 5}}>
                                <Button variant='contained' color='error' onClick={() => handleSim(selectedPJ)} >Sim</Button>
                                <Button variant='contained' onClick={() => handleNao()}>Não</Button>
                            </Box>
                        </>

                    ): (
                    <>
                    <TextField value={form.clienteNome} onChange={handleOnChangeNome} sx={{width:'300px'}} id='clienteNome' name='clienteNome' label="Nome" />
                    <TextField value={form.clienteRazaoSocial} onChange={handleOnChangeRazaoSocial} sx={{width:'300px'}} id='clienteRazaoSocial' name='clienteRazaoSocial' label="Razão Social" />
                    <TextField value={form.clienteInscricaoEstadual} onChange={handleOnChangeInscricaoEstadual} sx={{width:'300px'}} id='clienteInscricaoEstadual' name='clienteInscricaoEstadual' label="Inscrição Estadual" />
                    <TextField value={form.clienteTelefone} onChange={handleOnChangeTelefone} sx={{width:'300px'}} id='clienteNome' name='clienteNome' label="Telefone" />
                    <TextField value={form.clienteCNPJ} onChange={handleOnChangeCNPJ} sx={{width:'300px'}} id='clienteCNPJ' name='clienteCNPJ' label="CNPJ" />
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

export default PJForm;