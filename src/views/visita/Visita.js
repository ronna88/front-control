import React, { useState, useEffect } from 'react';
import { CardContent, Typography } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import VisitaFilterNew from '../../components/visita/VisitaFilterNew';
import BlankCard from '../../components/shared/BlankCard';
import { getAtivoData, getClienteData, getFuncionarioData, getVisitasData } from '../../api/Api';
import { toast } from 'react-toastify';
import VisitaTable from 'src/components/visita/VisitaTable';


const Visita = () => {
  const [cliente, setCliente] = useState()
  const [funcionarios, setFuncionarios] = useState()
  const [carregado, setCarregado] = useState(false)
  const [rows, setRows] = useState([])
  const [listaClientes, setListaClientes] = useState([])
  const [listaFuncionarios, setListaFuncionarios] = useState([])
  const [loading, setLoading] = useState(false)
  const [listaLocais, setListaLocais] = useState([])
  const [local, setLocal] = useState()
  const [erase, setErase] = useState(false)
  const [edit, setEdit] = useState(false)
  const [visitas, setVisitas] = useState([])
  const [form, setForm] = useState({
    visitaInicio: "",
    visitaFinal: "",
    visitaDescricao: "",
    visitaRemoto: false,
    visitaValorProdutos: 0.00,
    visitaTotalAbono: 0.00,
    funcionarios: [],
    cliente: "",
    local: "",
    visitaTotalHoras: 0.00,
  })

  useEffect(() => {
    if (!carregado) {
      getClienteData(0, 200, "")
        .then((response) => {
          console.log('Buscando dados dos clientes...')
          setListaClientes(response.data.content)
        })
        .catch((error) => {
          console.log(error)
          toast.error(`${error}`)
        })
        setCarregado(true)
      getFuncionarioData(0, 200, "")
      .then((responseFuncionario) => {
        console.log('Buscando dados dos funcionários...')
        // console.log(responseFuncionario.data.content)
        setListaFuncionarios(responseFuncionario.data.content)
      })
      .catch((error) => {
        console.log(error)
        toast.error(`${error}`)
      })
      getVisitasData(0, 200, "")
        .then((responseVisita) => {
          console.log("Buscando visitas...")
          setVisitas(responseVisita.data.content)
        })
    }
  }, [carregado])
  return (
    <PageContainer title="Visitas" description="página para tratativa das visitas">

      <DashboardCard title="Visitas">
        <Typography>Visitas Cadastradas</Typography>

        <BlankCard>
          <VisitaFilterNew listaClientes={listaClientes} setListaClientes={setListaClientes} listaFuncionarios={listaFuncionarios} form={form} setForm={setForm}
            rows={rows} setRows={setRows} loading={loading} setLoading={setLoading} listaLocais={listaLocais} setListaLocais={setListaLocais}
            cliente={cliente} setCliente={setCliente} funcionarios={funcionarios} setFuncionarios={setFuncionarios} local={local} setLocal={setLocal}
            erase={erase} setErase={setErase} visitas={visitas} setVisitas={setVisitas}
          />

          <CardContent>
            <VisitaTable listaClientes={listaClientes} setListaClientes={setListaClientes} listaFuncionarios={listaFuncionarios} form={form} setForm={setForm}
            rows={rows} setRows={setRows} loading={loading} setLoading={setLoading} listaLocais={listaLocais} setListaLocais={setListaLocais}
            cliente={cliente} setCliente={setCliente} funcionarios={funcionarios} setFuncionarios={setFuncionarios} local={local} setLocal={setLocal}
            erase={erase} setErase={setErase} visitas={visitas} setVisitas={setVisitas} edit={edit} setEdit={setEdit} />
          </CardContent>
        </BlankCard>
      </DashboardCard>
    </PageContainer>
  );
};

export default Visita;
