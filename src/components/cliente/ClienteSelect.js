import react from 'react'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


const ClienteSelect = ({listaClientes, cliente, setCliente, setRows, form, setForm}) => {
    
    const handleChange = (event) => {
        setCliente(event.target.value)
        const tempCliente = event.target.value
        setForm({...form, cliente: tempCliente})
        // console.log(event.target.value)
    }

    
    
    return(
        <>
        <FormControl sx={{width: '300px'}}>
            <InputLabel id='cliente'>Cliente</InputLabel>
            <Select sx={{padding: '10px', marginLeft:'10px', marginRight:'10px' }}
                labelId='cliente'
                id='cliente'
                value={form.cliente}
                onChange={handleChange}
                size="small"
                >
                <MenuItem value={-1} >Selecione</MenuItem>
                { listaClientes ? (
                    listaClientes.map((cliente) => (
                        <MenuItem key={cliente.clienteId} value={cliente.clienteId}>{cliente.clienteNome}</MenuItem>
                        ))
                        ) : 'Clientes não carregados' }
            </Select>
        </FormControl>
        </>
        )
}

export default ClienteSelect;