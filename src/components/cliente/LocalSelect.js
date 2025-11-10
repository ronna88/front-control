import { useState, useEffect }  from 'react'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { getLocaisData } from '../../api/Api';


const LocalSelect = ({form, setForm}) => {

    const [listaLocais, setListaLocais] = useState([])
    const [listaCarregada, setListaCarregada] = useState(false)
    const [local, setLocal] = useState([])
    
    const handleChange = (event) => {
        setLocal(event.target.value)
       
        const tempLocal = event.target.value
        setForm({...form, local: tempLocal})
    }
    
    useEffect(() => {
        if(!listaLocais.length > 0){
            if(!listaCarregada) {
                setListaCarregada(true)
                getLocaisData(form?.cliente)
                    .then((response) => {
                        setListaLocais(response.data.content);
                         console.log('Local selecionado: ' + local)
                        })
                    .catch((error) => {
                        console.log('Error: ' + error);
                    })
            }
        }
    },[listaLocais])

    
    return(
        <>

        <InputLabel id='visitaValorProdutosLabel' sx={{paddingLeft:'10px', zIndex:'1'}}>Local</InputLabel>
        <FormControl sx={{width: '300px'}}>
            <Select sx={{padding: '10px', marginLeft: '10px', marginRight:'10px'}}
                labelId='local'
                id='local'
                value={form?.local}
                onChange={handleChange}
                size="small"
                >
                <MenuItem value={-1} >Selecione</MenuItem>
                { listaLocais ? (
                    listaLocais?.map((local) => (
                        <MenuItem key={local.localId} value={local.localId}>{local.localNome}</MenuItem>
                        ))
                        ) : 'Locais não carregados' }
            </Select>
        </FormControl>
        </>
        )
}

export default LocalSelect;