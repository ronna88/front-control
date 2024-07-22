import react, { useEffect } from 'react'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';



const FuncionarioSelect = ({listaFuncionarios, funcionario, setFuncionario, setRows, form, setForm}) => {
    
    const handleChange = (event) => {
      console.log("onchange")
        console.log(event)
        var funcionarios = []
      //console.log(form)
      for (var i = 0; i< event.target.options.length; i++) {
        if(event.target.options[i].selected) {
            console.log(event.target.options[i].value);
            funcionarios.push({funcionarioId: event.target.options[i].value})
            setForm({...form, funcionarios:funcionarios})
        }
      }
    }

    useEffect(()=> {
        console.log("event")
        console.log(listaFuncionarios)
        //console.log(form)
    },[listaFuncionarios])
    
    return(
        <>
            <InputLabel id='visitaValorProdutosLabel' sx={{paddingLeft:'10px', zIndex:'1'}}>Funcionários</InputLabel>
        <FormControl sx={{width: '320px'}}>
            
            <Select sx={{padding: '10px', marginLeft:'10px', marginRight:'10px' }}
                labelId='funcionario'
                id='cliente'
                multiple
                native
                value={form?.funcionario}
                onChange={handleChange}
                size="small"
                >
                { listaFuncionarios ? (
                    listaFuncionarios.map((funcionario) => (
                        <option key={funcionario.funcionarioId} value={funcionario.funcionarioId}> {funcionario.funcionarioNome}</option>
                        ))
                        ) : 'Funcionários não carregados' }
            </Select>
        </FormControl>
        </>
        )
}

export default FuncionarioSelect;