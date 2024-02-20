import react from 'react'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';


const AtivoSelect = ({listaAtivos, ativos, setAtivos, setRows, setForm, form}) => {

    const handleChange = (event) => {
        const { options } = event.target;
        const value = [];
        for (let i = 0, l = options.length; i < l; i += 1) {
            if (options[i].selected) {
                value.push({id:options[i].value});
            }
        }
        setForm({...form, listaAtivos: value})
    }

    return(
        <>
        <FormControl sx={{width: '300px'}}>
            <InputLabel id='ativos'>Ativos</InputLabel>
            <Select sx={{padding: '20px'}}
                multiple
                native
                value={ativos}
                onChange={handleChange}
                labelId='ativos'
                id='ativos'
                inputPros={{
                id: 'ativos-select',
                }}
                >
                { listaAtivos ? (
                    listaAtivos.map((ativo) => (
                        <option key={ativo.ativoId} value={ativo.ativoId}>{ativo.ativoDescricao}</option>
                        ))
                        ) : 'Ativos não carregados' }
            </Select>
        </FormControl>
        </>
        )
}

export default AtivoSelect;