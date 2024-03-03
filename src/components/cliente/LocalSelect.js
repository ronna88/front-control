import react from 'react'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


const LocalSelect = ({listaLocais, local, setLocal, form, setForm}) => {
    
    const handleChange = (event) => {
        setLocal(event.target.value)
        const tempLocal = event.target.value
        setForm({...form, local: tempLocal})
        console.log(event.target.value)
    }
    

    
    return(
        <>
        <FormControl sx={{width: '300px'}}>
            <InputLabel id='local'>Local</InputLabel>
            <Select sx={{padding: '10px', marginLeft: '10px', marginRight:'10px'}}
                labelId='local'
                id='local'
                value={form?.local}
                onChange={handleChange}
                size="small"
                >
                <MenuItem value={-1} >Selecione</MenuItem>
                { listaLocais ? (
                    listaLocais.map((local) => (
                        <MenuItem key={local.localId} value={local.localId}>{local.localNome}</MenuItem>
                        ))
                        ) : 'Locais não carregados' }
            </Select>
        </FormControl>
        </>
        )
}

export default LocalSelect;