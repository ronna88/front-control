    import { useEffect, useState } from 'react';
    import BlankCard from '../shared/BlankCard';
    import Button from '@mui/material/Button';
    import {
        InputLabel,
        TextField,
    } from '@mui/material';
    import ModalForm from './ModalForm';
import { getFechamentoFiltro } from 'src/api/Api';
import ClienteSelect from '../cliente/ClienteSelect';


 

    const FechamentoFilterNew = ({listaClientes, setFechamentosCarregados, setEdit, setFechamentos}) => {

        const [open, setOpen] = useState(false);
        const handleOpen = () => setOpen(true);
        const handleClose = () => setOpen(false);
        
        const [form, setForm] = useState({
            cliente: "",
            local: "",
            clienteLocalId: "",
            fechamentoInicio: "",
            fechamentoFinal: "",
        })

        const [dataInicio, setDataInicio] = useState();
        const [dataFinal, setDataFinal] = useState();


        const handleChangeInicio = (event) => {
            setForm({...form, fechamentoInicio: event.target.value})
        }
        const handleChangeFinal = (event) => {
            setForm({...form, fechamentoFinal: event.target.value})
        }

        const handleFiltroClick = () => {    
            getFechamentoFiltro(form)
            .then((res) => {
                console.log('OK');
                console.log(res.data)
                setFechamentos(res.data)
            })
            .catch((error) => {
                console.log('deu ruim')
                console.log(error)
            })
        }
        
        useEffect(()=>{
            // console.log(filtro)
        },[form])


        return (
            <>
                <BlankCard >
                    <Button sx={{margin: '20px'}} variant='contained' onClick={handleOpen}>Novo</Button>

                    <div className='filtros'>
                       
                        <InputLabel>Data de Início: </InputLabel>
                        <TextField type='date' onChange={handleChangeInicio} value={form?.fechamentoInicio} />
                    
                        <InputLabel>Data de Fim: </InputLabel>
                        <TextField type='date' onChange={handleChangeFinal} value={form?.fechamentoFinal} />

                        <ClienteSelect listaClientes={listaClientes} form={form} setForm={setForm}/>

                        <Button sx={{margin: '20'}} variant='outlined' onClick={(event) => {handleFiltroClick(event)}}>Filtrar</Button>
                    </div>
                </BlankCard>
                <ModalForm open={open} handleClose={handleClose} form={form} setForm={setForm} listaClientes={listaClientes} setFechamentosCarregados={setFechamentosCarregados} setEdit={setEdit} />
            </>
        
        )
    }

    export default FechamentoFilterNew;