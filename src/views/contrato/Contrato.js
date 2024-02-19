import React, {useState, useEffect} from 'react';
import { Typography, CardContent } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import BlankCard from '../../components/shared/BlankCard';
import { getAtivoData, getClienteData } from '../../api/Api';
import { toast } from 'react-toastify';

import ContratoTable from '../../components/contrato/ContratoTable'
import ContratoFilterNew from '../../components/contrato/ContratoFilterNew'


const Contrato = () => {
  const [listaAtivos, setListaAtivos] = useState([])
  const [listaClientes, setListaClientes] = useState([])
  const [cliente, setCliente] = useState([])
  const [selectedContrato, setSelectedContrato] = useState([])
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [edit, setEdit] = useState(false)
  const [erase, setErase] = useState(false)

  useEffect(()=>{
    getAtivoData(0, 200, "")
    .then((response) => {
      setListaAtivos(response.data.content)
    })
    .catch((error) => {
      console.log(error)
      toast.error(`${error}`)
    })

    getClienteData(0, 200, "")
    .then((response) => {
      setListaClientes(response.data.content)
    })
    .catch((error) => {
      console.log(error)
      toast.error(`${error}`)
    })

    // getContatoData(0, 100)
  },[])

  return (
    <PageContainer title="Contratos" description="página para tratativa dos contratos">

      <DashboardCard title="Contratos">
        <Typography>Contratos Cadastrados</Typography>

        <BlankCard>
         <ContratoFilterNew setRows={setRows} loading={loading} setLoading={setLoading} />
          <CardContent>
            <ContratoTable rows={rows} setRows={setRows} loading={loading} setLoading={setLoading} edit={edit} setEdit={setEdit} erase={erase} setErase={setErase}
            selectedContrato={selectedContrato} setSelectedContrato={setSelectedContrato} />
          </CardContent>
        </BlankCard>

      </DashboardCard>
    </PageContainer>
  );
};

export default Contrato;
