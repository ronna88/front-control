import React, { useState, useEffect } from 'react';
import {CardContent,Typography} from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import BlankCard from '../../components/shared/BlankCard';
import { getPJData, getPFData } from '../../api/Api';
import { toast } from 'react-toastify';

import LocalTable from '../../components/cliente/local/LocalTable'
import LocalFilterNew from '../../components/cliente/local/LocalFilterNew'

import PJSelect from '../../components/cliente/PJSelect'
import PFSelect from '../../components/cliente/PFSelect'


const Locais = () => {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [edit, setEdit] = useState(false)
  const [erase, setErase] = useState(false)

  const [listaPF, setListaPF] = useState([])
  const [PFSelected, setPFSelected] = useState([])
  const [listaPJ, setListaPJ] = useState([])
  const [PJSelected, setPJSelected] = useState([])

  useEffect(() => {
    getPJData(0, 200, "")
    .then((response) => {
      setListaPJ(response.data.content)
    })
    .catch((error) => {
      console.log(error)
      toast.error(`${error}`)
    })
  },[])

  useEffect(()=>{
   // console.log("effect mudou PJSelected")
   // console.log(PJSelected)
  }, [PJSelected])


  return (
    <PageContainer title="Locais" description="página para tratativa dos locais">
      <DashboardCard title="Locais">
        <Typography>Locais Cadastrados</Typography>

        <BlankCard>
          <PJSelect listaPJ={listaPJ} PJSelected={PJSelected} setPJSelected={setPJSelected}/>
          {PJSelected.length > 0 ? <LocalFilterNew setRows={setRows} loading={loading}
            setLoading={setLoading} PJSelected={PJSelected} /> :
          (
            <>
            <Typography variant="h6" component="h3" sx={{margin: '40px'}}>
              Selecione um cliente PJ para poder criar um novo local
            </Typography>
            </>) }

          <CardContent>
            {PJSelected.length > 0 ? (
              <>
              <LocalTable rows={rows} setRows={setRows}
                loading={loading} setLoading={setLoading}
                edit={edit} setEdit={setEdit} erase={erase} setErase={setErase} PJSelected={PJSelected} setPJSelected={setPJSelected} />
              </>
            ) : 'Sem dados de locais..' }
          </CardContent>
        </BlankCard>

        { /*
        <BlankCard>
          <PFSelect listaPF={listaPF} PFSelected={PFSelected}/>
          <LocalFilterNew setRows={setRows} loading={loading} setLoading={setLoading} />
          <CardContent>

            <LocalTable rows={rows} setRows={setRows} loading={loading} setLoading={setLoading} edit={edit} setEdit={setEdit} erase={erase} setErase={setErase}/>

</CardContent>
        </BlankCard>
 */}
      </DashboardCard>

    </PageContainer>
    );
};

export default Locais;
