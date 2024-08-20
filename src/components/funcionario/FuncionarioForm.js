import {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import BlankCard from '../../components/shared/BlankCard';
import Button from '@mui/material/Button';
import {saveFuncionarioData, deleteFuncionario} from '../../api/Api';
import { useNavigate } from "react-router-dom";
import { InputLabel, Typography } from '@mui/material';
import { toast } from 'react-toastify';

const FuncionarioForm = ({handleOpen, handleClose, setRows,
    setLoading, edit, setEdit, erase, setErase, selectedFuncionario, setSelectedFuncionario}) => {
    const navigate = useNavigate();
        const [form, setForm] = useState({
            "funcionarioNome": "",
            "funcionarioNascimento": "",
            "funcionarioCPF": "",
            "funcionarioEmail": "",
            "funcionarioTelefone": "",
            "funcionarioEndereco": "",
            "funcionarioEndereco2": "",
            "funcionarioBairro": "",
            "funcionarioCEP": "",
            "funcionarioAdmissao": ""
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
        setForm({...form, funcionarioStatus: 'ATIVO'})
        saveFuncionarioData(form)
            .then((response) => {
                setRows([])
                setLoading(true)
                setEdit(false)
                setErase(false)
                handleClose()
                toast.success('Funcionário salvo com sucesso!')
            })
            .catch((error) => {
                console.log(error)
                toast.error(`${error.response.data}`)
            })
    }

    const handleOnChangeNome = (event) => {
        setForm({...form, funcionarioNome: event.target.value});
    }
    const handleOnChangeNascimento = (event) => {
        setForm({...form, funcionarioNascimento: event.target.value});
    }
    
    const handleOnChangeCpf = (event) => {
        setForm({...form, funcionarioCPF: event.target.value});
    }
    
    const handleOnChangeEmail = (event) => {
        setForm({...form, funcionarioEmail: event.target.value});
    }
    
    const handleOnChangeTelefone = (event) => {
        setForm({...form, funcionarioTelefone: event.target.value});
    }
    
    const handleOnChangeEndereco = (event) => {
        setForm({...form, funcionarioEndereco: event.target.value});
    }
    
    const handleOnChangeEndereco2 = (event) => {
        setForm({...form, funcionarioEndereco2: event.target.value});
    }
    
    const handleOnChangeBairro = (event) => {
        setForm({...form, funcionarioBairro: event.target.value});
    }
    
    const handleOnChangeCEP = (event) => {
        setForm({...form, funcionarioCEP: event.target.value});
    }
    
    const handleOnChangeAdmissao = (event) => {
        setForm({...form, funcionarioAdmissao: event.target.value});
    }
    
    
    
    const handleSim = (funcionario) => {
        deleteFuncionario(funcionario)
            .then((response) => {
                setRows([])
                setLoading(true)
                setSelectedFuncionario()
                handleClose()
                toast.success('Funcionario apagado com sucesso!')
            })
            .catch((error) => {
                console.log(error);
                toast.error(`${error.response.data}`)
            })
    }

    const handleNao = () => {
        setRows([])
        setSelectedFuncionario()
        setLoading(true)
        handleClose()
    }

    useEffect(()=> {
        if (selectedFuncionario) {
            console.log(selectedFuncionario)
            setForm({
                funcionarioId: selectedFuncionario.funcionarioId,
                funcionarioNome: selectedFuncionario.funcionarioNome,
                funcionarioNascimento: selectedFuncionario.funcionarioNascimento,
                funcionarioCPF: selectedFuncionario.funcionarioCPF,
                funcionarioEmail: selectedFuncionario.funcionarioEmail,
                funcionarioTelefone: selectedFuncionario.funcionarioTelefone,
                funcionarioEndereco: selectedFuncionario.funcionarioEndereco,
                funcionarioEndereco2: selectedFuncionario.funcionarioEndereco2,
                funcionarioBairro: selectedFuncionario.funcionarioBairro,
                funcionarioCEP: selectedFuncionario.funcionarioCEP,
                funcionarioAdmissao: selectedFuncionario.funcionarioAdmissao,
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
                                Deseja realmente apagar o funcionario:  {selectedFuncionario.funcionarioNome}?
                            </Typography>
                            <Box sx={{display: 'flex', gap: 5}}>
                                <Button variant='contained' color='error' onClick={() => handleSim(selectedFuncionario)} >Sim</Button>
                                <Button variant='contained' onClick={() => handleNao()}>Não</Button>
                            </Box>
                        </>

                    ): (
                        <>
                    <div className='formContainer'>
                        <div className='col-1'>
                            <InputLabel>Nome</InputLabel>
                            <TextField value={form.funcionarioNome} onChange={handleOnChangeNome} sx={{width:'300px'}} id='funcionarioNome' name='funcionarioNome' label="Nome Completo" />
                            <InputLabel>Data de Nascimento</InputLabel>
                            <TextField type='date' value={form.funcionarioNascimento} onChange={handleOnChangeNascimento} sx={{width:'300px'}} id='funcionarioNascimento' name='funcionarioNascimento'/>
                            <InputLabel>CPF</InputLabel>
                            <TextField value={form.funcionarioCPF} onChange={handleOnChangeCpf} sx={{width:'300px'}} id='funcionarioCPF' name='funcionarioCPF' label="CPF" />
                            <InputLabel>Email</InputLabel>
                            <TextField value={form.funcionarioEmail} onChange={handleOnChangeEmail} sx={{width:'300px'}} id='funcionarioEmail' name='funcionarioEmail' label="Email" />
                            <InputLabel>Telefone</InputLabel>
                            <TextField value={form.funcionarioTelefone} onChange={handleOnChangeTelefone} sx={{width:'300px'}} id='funcionarioTelefone' name='funcionarioTelefone' label="Telefone" />
                        </div>
                        <div className='colForm'>
                            <InputLabel>Endereço</InputLabel>
                            <TextField value={form.funcionarioEndereco} onChange={handleOnChangeEndereco} sx={{width:'300px'}} id='funcionarioEndereco' name='funcionarioEndereco' label="Endereço" />
                            <InputLabel>Endereço 2</InputLabel>
                            <TextField value={form.funcionarioEndereco2} onChange={handleOnChangeEndereco2} sx={{width:'300px'}} id='funcionarioEndereco2' name='funcionarioEndereco2' label="Endereço2" />
                            <InputLabel>Bairro</InputLabel>
                            <TextField value={form.funcionarioBairro} onChange={handleOnChangeBairro} sx={{width:'300px'}} id='funcionarioBairro' name='funcionarioBairro' label="Bairro" />
                            <InputLabel>CEP</InputLabel>
                            <TextField value={form.funcionarioCEP} onChange={handleOnChangeCEP} sx={{width:'300px'}} id='funcionarioCEP' name='funcionarioCEP' label="CEP" />
                            <InputLabel>Data de Admissão</InputLabel>
                            <TextField type='date' value={form.funcionarioAdmissao} onChange={handleOnChangeAdmissao} sx={{width:'300px'}} id='funcionarioAdmissao' name='funcionarioAdmissao'  />
                        </div>
                    </div>
                    <Button sx={{margin: '20px'}} variant='contained' onClick={handleSave}>Atualizar</Button>
                    </>
                )
            }
            </Box>
        </BlankCard>
    );
}

export default FuncionarioForm;