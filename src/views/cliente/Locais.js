import React, { useState, useEffect } from 'react';
import {CardContent,Typography} from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import BlankCard from '../../components/shared/BlankCard';
import { getPJData, getPFData } from '../../api/Api';
import { toast } from 'react-toastify';

import LocalTable from '../../components/cliente/local/LocalTable'
import LocalFilterNew from '../../components/cliente/local/LocalFilterNew'
import LocalTablePF from '../../components/cliente/local/LocalTablePF'
import LocalFilterNewPF from '../../components/cliente/local/LocalFilterNewPF'

import PJSelect from '../../components/cliente/PJSelect'
import PFSelect from '../../components/cliente/PFSelect'


const Locais = () => {
  const [rows, setRows] = useState([])
  const [rowsPF, setRowsPF] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadingPF, setLoadingPF] = useState(true)
  const [edit, setEdit] = useState(false)
  const [erase, setErase] = useState(false)
  const [editPF, setEditPF] = useState(false)
  const [erasePF, setErasePF] = useState(false)

  const [listaPF, setListaPF] = useState([])
  const [PFSelected, setPFSelected] = useState(-1)
  const [listaPJ, setListaPJ] = useState([])
  const [PJSelected, setPJSelected] = useState(-1)
  const [selectedLocal, setSelectedLocal] = useState([])

  useEffect(() => {
    getPJData(0, 200, "")
    .then((response) => {
      setListaPJ(response.data.content)
    })
    .catch((error) => {
      console.log(error)
      toast.error(`${error}`)
    })

    getPFData(0, 200, "")
    .then((response) => {
      setListaPF(response.data.content)
    })
    .catch((error) => {
      console.log(error)
      toast.error(`${error}`)
    })
  },[])

  useEffect(()=>{
  }, [PJSelected])


  return (
    <PageContainer title="Locais" description="página para tratativa dos locais">
      <DashboardCard title="Locais">
        <Typography>Locais Cadastrados</Typography>

        <BlankCard>
          <div style={{padding:'10px'}}>
            <PJSelect listaPJ={listaPJ} PJSelected={PJSelected} setPJSelected={setPJSelected} setRows={setRows}/>
            {PJSelected.length > 0 ? <LocalFilterNew setRows={setRows} loading={loading} setLoading={setLoading}
              PJSelected={PJSelected} edit={edit} setEdit={setEdit} erase={erase} setErase={setErase}
              selectedLocal={selectedLocal} setSelectedLocal={setSelectedLocal} setPJSelected={setPJSelected}/> :
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
          </div>
        </BlankCard>


        <BlankCard>
          <div style={{padding:'10px'}}>
          <PFSelect listaPF={listaPF} PFSelected={PFSelected} setPFSelected={setPFSelected} setRowsPF={setRowsPF}/>
          {PFSelected.length > 0 ? <LocalFilterNewPF setRowsPF={setRowsPF} loadingPF={loadingPF} setLoadingPF={setLoadingPF}
            PFSelected={PFSelected} editPF={editPF} setEditPF={setEditPF} erasePF={erasePF} setErasePF={setErasePF}
            selectedLocal={selectedLocal} setSelectedLocal={setSelectedLocal} setPFSelected={setPFSelected} /> :
          (
            <>
            <Typography variant="h6" component="h3" sx={{margin: '40px'}}>
              Selecione um cliente PF para poder criar um novo local
            </Typography>
            </>) }

          <CardContent>
            {PFSelected.length > 0 ? (
              <>
              <LocalTablePF rowsPF={rowsPF} setRowsPF={setRowsPF}
                loadingPF={loadingPF} setLoadingPF={setLoadingPF}
                editPF={editPF} setEditPF={setEditPF} erasePF={erasePF} setErasePF={setErasePF} PFSelected={PFSelected}
                setPFSelected={setPFSelected} />
              </>
              ) : 'Sem dados de locais..' }
          </CardContent>
            </div>
        </BlankCard>

      </DashboardCard>

    </PageContainer>
    );
};

export default Locais;
