    import { useEffect, useState } from 'react';
    import BlankCard from '../shared/BlankCard';
    import Button from '@mui/material/Button';
    import {
        InputLabel,
        TextField,
    } from '@mui/material';
    import ModalForm from './ModalForm';
import { getFechamentoFiltro } from 'src/api/Api';


 

    const FechamentoFilterNew = ({listaClientes, setFechamentosCarregados, setEdit}) => {

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
        const [filtro, setFiltro] = useState();

        const [dataInicio, setDataInicio] = useState();
        const [dataFinal, setDataFinal] = useState();


        const handleChangeInicio = (event) => {
            setFiltro({...filtro, fechamentoInicio: event.target.value})
        }
        const handleChangeFinal = (event) => {
            setFiltro({...filtro, fechamentoFinal: event.target.value})
        }

        const handleFiltroClick = () => {
            
            console.log('cliquei')
            getFechamentoFiltro(filtro)
            .then((res) => {
                console.log('OK');
                console.log(res)
                
            })
            .catch((error) => {
                console.log('deu ruim')
                console.log(error)
            })
        }
        
        useEffect(()=>{
            // console.log(filtro)
        },[filtro])


        return (
            <>
                <BlankCard >
                    <Button sx={{margin: '20px'}} variant='contained' onClick={handleOpen}>Novo</Button>

                    <div className='filtros'>
                       
                        <InputLabel>Data de Início: </InputLabel>
                        <TextField type='datetime-local' onChange={handleChangeInicio} value={filtro?.fechamentoInicio} />
                    
                        <InputLabel>Data de Fim: </InputLabel>
                        <TextField type='datetime-local' onChange={handleChangeFinal} value={filtro?.fechamentoFinal} />

                        <Button sx={{margin: '20'}} variant='outlined' onClick={(event) => {handleFiltroClick(event)}}>Filtrar</Button>
                    </div>
                </BlankCard>
                <ModalForm open={open} handleClose={handleClose} form={form} setForm={setForm} listaClientes={listaClientes} setFechamentosCarregados={setFechamentosCarregados} setEdit={setEdit} />
            </>
        
        )
    }

    export default FechamentoFilterNew;