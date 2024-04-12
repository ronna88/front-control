import React, { useState, useEffect } from 'react';
import { CardContent, Typography } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import VisitaFilterNew from '../../components/visita/VisitaFilterNew';
import BlankCard from '../../components/shared/BlankCard';
import { getAtivoData, getClienteData } from '../../api/Api';
import { toast } from 'react-toastify';


const Visita = () => {
  const [cliente, setCliente] = useState()
  const [carregado, setCarregado] = useState(false)
  const [rows, setRows] = useState([])
  const [listaClientes, setListaClientes] = useState([])
  const [listaAtivos, setListaAtivos] = useState([])
  const [ativos, setAtivos] = useState([])
  const [loading, setLoading] = useState(false)
  const [listaLocais, setListaLocais] = useState([])
  const [local, setLocal] = useState()

  const [form, setForm] = useState({
    visitaInicio: "",
    visitaFinal: "",
    visitaDescricao: "",
    visitaRemoto: false,
    visitaValorProdutos: 0.00,
    visitaTotalAbono: 0.0,
    funcionarios: [
      {
        funcionariosId: ""
      }
    ],
    cliente: "",
    local: ""
  })

  useEffect(() => {
    if (!carregado) {
      getClienteData(0, 200, "")
        .then((response) => {
          console.log(response.data.content)
          setListaClientes(response.data.content)
        })
        .catch((error) => {
          console.log(error)
          toast.error(`${error}`)
        })
        setCarregado(true)
    }
  }, [carregado, cliente])
  return (
    <PageContainer title="Visitas" description="página para tratativa das visitas">

      <DashboardCard title="Visitas">
        <Typography>Visitas Cadastradas</Typography>

        <BlankCard>
          <VisitaFilterNew listaClientes={listaClientes} setListaClientes={setListaClientes}
            cliente={cliente} setCliente={setCliente} form={form} setForm={setForm}
            listaLocais={listaLocais} setListaLocais={setListaLocais}

          />

          <CardContent>
            <h6>Card Content - Tabela de visitas</h6>
          </CardContent>
        </BlankCard>
      </DashboardCard>
    </PageContainer>
  );
};

export default Visita;
