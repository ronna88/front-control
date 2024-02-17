import react from 'react'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


const PJSelect = ({listaPJ, PJSelected, setPJSelected}) => {
    
    const handleChange = (event) => {
        setPJSelected(event.target.value)
        // console.log(event.target.value)
    }
    
    return(
        <>
        <FormControl sx={{width: '300px'}}>
            <InputLabel id='clientepj'>Cliente PJ</InputLabel>
            <Select
                labelId='clientepj'
                id='clientepj'
                value={PJSelected}
                label='Cliente PJ'
                onChange={handleChange}
            >
                <MenuItem value={-1}>Selecione</MenuItem>
                {listaPJ ? (
                    listaPJ.map((pj) => (
                        <MenuItem value={pj.clienteId}>{pj.clienteNome}</MenuItem>
                    ))
                ) : `Cliente PJ não carregadas` }
                   
                
            </Select>
        </FormControl>
        </>
    )
}

export default PJSelect;