
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


const PFSelect = ({listaPF, PFSelected, setPFSelected, setRowsPF}) => {
    
    const handleChange = (event) => {
        // setRowsPF([])
        setPFSelected(event.target.value)
    }
    
    return(
        <>
        <FormControl sx={{width: '300px'}}>
            <InputLabel id='clientepf'>Cliente PF</InputLabel>
            <Select
                labelId='clientepf'
                id='clientepf'
                value={PFSelected}
                label='Cliente PF'
                onChange={handleChange}
                >
                <MenuItem value={-1} >Selecione</MenuItem>
                {listaPF ? (
                    listaPF.map((pf) => (
                        <MenuItem key={pf.clienteId} value={pf.clienteId}>{pf.clienteNome}</MenuItem>
                        ))
                        ) : `Cliente PF não carregadas` }
            </Select>
        </FormControl>
        </>
        )
}

export default PFSelect;