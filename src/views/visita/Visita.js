import React, { useState, useEffect } from 'react';
import { CardContent, Typography } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import VisitaFilterNew from '../../components/visita/VisitaFilterNew';
import BlankCard from '../../components/shared/BlankCard';
import { getClienteData, getFuncionarioData, getVisitasDataFiltro } from '../../api/Api';
import { toast } from 'react-toastify';
import VisitaTable from 'src/components/visita/VisitaTable';

const Visita = () => {
  const [cliente, setCliente] = useState();
  const [funcionarios, setFuncionarios] = useState();
  const [carregado, setCarregado] = useState(false);
  const [rows, setRows] = useState([]);
  const [listaClientes, setListaClientes] = useState([]);
  const [listaFuncionarios, setListaFuncionarios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [local, setLocal] = useState();
  const [erase, setErase] = useState(false);
  const [edit, setEdit] = useState(false);
  const [visitas, setVisitas] = useState([]);
  const [filtro, setFiltro] = useState({
    funcionario: '',
    visitaInicio: '',
    visitaFinal: '',
  });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);

  useEffect(() => {
    console.log(carregado);
    if (!carregado) {
      setCarregado(true);
      getClienteData(0, 200, '')
        .then((response) => {
          console.log('Buscando dados dos clientes...');
          setListaClientes(response.data.content);
        })
        .catch((error) => {
          console.log(error);
          toast.error(`${error}`);
        });
      getFuncionarioData(0, 200, '')
        .then((responseFuncionario) => {
          console.log('Buscando dados dos funcionários...');
          setListaFuncionarios(responseFuncionario.data.content);
        })
        .catch((error) => {
          console.log(error);
          toast.error(`${error}`);
        });
      /*getVisitasData(0, 300, "")
        .then((responseVisita) => {
          console.log("Buscando visitas...")
          setRows(responseVisita.data)
        }) */
      getVisitasDataFiltro(filtro, 0, 20).then((responseVisita) => {
        console.log('Buscando visitas...');
        console.log(responseVisita.data);
        setRows(responseVisita.data);
      });
    }
  }, [carregado]);

  useEffect(() => {
    //console.log(rows)
  }, [rows]);

  return (
    <PageContainer title="Visitas" description="página para tratativa das visitas">
      <DashboardCard title="Visitas">
        <Typography>Visitas Cadastradas</Typography>

        <BlankCard>
          <VisitaFilterNew
            listaClientes={listaClientes}
            setListaClientes={setListaClientes}
            listaFuncionarios={listaFuncionarios}
            rows={rows}
            setRows={setRows}
            loading={loading}
            setLoading={setLoading}
            cliente={cliente}
            setCliente={setCliente}
            funcionarios={funcionarios}
            setFuncionarios={setFuncionarios}
            local={local}
            setLocal={setLocal}
            erase={erase}
            setErase={setErase}
            filtro={filtro}
            setFiltro={setFiltro}
            setCarregado={setCarregado}
            carregado={carregado}
          />

          <CardContent>
            <VisitaTable
              listaClientes={listaClientes}
              setListaClientes={setListaClientes}
              listaFuncionarios={listaFuncionarios}
              rows={rows}
              setRows={setRows}
              loading={loading}
              setLoading={setLoading}
              cliente={cliente}
              setCliente={setCliente}
              funcionarios={funcionarios}
              setFuncionarios={setFuncionarios}
              local={local}
              setLocal={setLocal}
              erase={erase}
              setErase={setErase}
              visitas={visitas}
              setVisitas={setVisitas}
              edit={edit}
              setEdit={setEdit}
              filtro={filtro}
              setFiltro={setFiltro}
              page={page}
              setPage={setPage}
              rowsPerPage={rowsPerPage}
              setRowsPerPage={setRowsPerPage}
              setCarregado={setCarregado}
              carregado={carregado}
            />
          </CardContent>
        </BlankCard>
      </DashboardCard>
    </PageContainer>
  );
};

export default Visita;
