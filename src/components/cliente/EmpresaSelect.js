import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


const EmpresaSelect = ({handleOnChangeEmpresa, empresa, setEmpresa, listaEmpresas}) => {
    
    const handleChange = (event) => {
        setEmpresa(event.target.value)
        handleOnChangeEmpresa(event.target.value)
    }
    
    return(
        <>
        <FormControl sx={{width: '300px'}}>
            <InputLabel id='empresa'>Empresa</InputLabel>
            <Select
                labelId='empresa'
                id='empresa'
                value={empresa}
                label='Empresa'
                onChange={handleChange}
            >
                <MenuItem value={-1}>Selecione</MenuItem>
                {listaEmpresas ? (
                    listaEmpresas.map((empresa) => (
                        <MenuItem value={empresa.empresaId}>{empresa.empresaNomeFantasia}</MenuItem>
                    ))
                ) : `Empresas não carregadas` }
                   
                
            </Select>
        </FormControl>
        </>
    )
}

export default EmpresaSelect;