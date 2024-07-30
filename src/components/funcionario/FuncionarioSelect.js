import react, { useEffect, useState } from 'react'
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const FuncionarioSelect = ({ listaFuncionarios, form, setForm, setFuncionariosSelecionados, funcionariosSelecionados }) => {
    var funcionarios = []
    var fTemp = []

    const [carregado, setCarregado] = useState(false)

    /*const handleChange = (event) => {
        fTemp = []
      for (var i = 0; i< event.target.options.length; i++) {
        if(event.target.options[i].selected) {
            fTemp.push(event.target.options[i].value)
            funcionarios.push({funcionarioId: event.target.options[i].value})
            
        }
      }
      setForm({...form, funcionarios:funcionarios})
      form.funcionario = fTemp
      console.log(form.funcionario)
    } */

    const value = []
    const handleChangeMultiple = (event) => {
        const { options } = event.target
        const value = []
        for (let i = 0, l = options.length; i < l; i += 1) {
            if (options[i].selected) {
                value.push(options[i].value)
                funcionarios.push({ funcionarioId: options[i].value })
            }
        }
        setForm({ ...form, funcionarios: funcionarios })
        setFuncionariosSelecionados(value)
    }

    useEffect(() => {
        console.log('funcionarios')
        console.log(form.funcionarios)
        if (!carregado) {
            setFuncionariosSelecionados(form.funcionarios)
            if (form.funcionarios.length >= 1) {
                for (var i = 0; i < form.funcionarios.length; i++) {
                    fTemp.push(form.funcionarios[i].funcionarioId)
                }
                form.funcionario = fTemp
            }
        }

    }, [])


    return (
        <>
            <InputLabel id='visitaValorProdutosLabel' sx={{ paddingLeft: '10px', zIndex: '1' }}>Funcionários</InputLabel>
            <FormControl sx={{ width: '320px' }}>

                <Select sx={{ padding: '10px', marginLeft: '10px', marginRight: '10px' }}
                    labelId='funcionario'
                    id='funcionario'
                    multiple
                    native
                    value={funcionariosSelecionados}
                    onChange={handleChangeMultiple}
                    size="small"
                >
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

export default FuncionarioSelect;