import react from 'react'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import {useState, useEffect} from 'react';


const AtivoSelect = ({listaAtivos, ativos, setAtivos, setRows, setForm, form, selectedContrato}) => {
    const [listaCarregada, setListaCarregada] = useState(true)

    const handleChange = (event) => {
        const { options } = event.target;
        const value = [];
        const valueTemp = []
        for (let i = 0, l = options.length; i < l; i += 1) {
            if (options[i].selected) {
                value.push(options[i].value);
                valueTemp.push({ativoId:options[i].value})
            }
        }
        setAtivos(value)
        setForm({...form, listaAtivos: valueTemp})
    }

    useEffect(() => {
        console.log(selectedContrato)

        if(selectedContrato.listaAtivos.length > 0) {
            if(ativos.length === 0) {
                selectedContrato.listaAtivos.forEach((ativo) => {
                    setAtivos(prevList => [...prevList, ativo.ativoId])
                })
            } else {
                // console.log(ativos)
            }
        }
    },[])

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