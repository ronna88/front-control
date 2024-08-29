import react, { useEffect, useState } from 'react'
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const FuncionarioSingleSelect = ({ listaFuncionarios, filtro, setFiltro }) => {
    const [carregado, setCarregado] = useState(false)

    const handleChange = (event) => {
        setFiltro({...filtro, funcionario:event.target.value})
    }


    return (
        <>
            <InputLabel id='funcionarioSelecionado' sx={{ paddingLeft: '10px', zIndex: '1' }}>Funcionário</InputLabel>
            <FormControl sx={{ width: '320px' }}>

                <Select sx={{ padding: '10px', marginLeft: '10px', marginRight: '10px' }}
                    labelId='funcionario'
                    id='funcionario'
                    native
                    value={filtro.funcionario}
                    onChange={handleChange}
                    size="small"
                >
                     <option key={-1} value={-1}>Selecione...</option>
                    {listaFuncionarios ? (
                        listaFuncionarios.map((funcionario) => (
                            <option key={funcionario.funcionarioId} value={funcionario.funcionarioId}> {funcionario.funcionarioNome}</option>
                        ))
                    ) : 'Funcionários não carregados'}
                </Select>
            </FormControl>
        </>
    )
}

export default FuncionarioSingleSelect;