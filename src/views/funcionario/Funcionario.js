import React, {useState, useEffect} from 'react';
import { Typography, CardContent } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import BlankCard from '../../components/shared/BlankCard';

import { getFuncionarioData } from '../../api/Api';
import { toast } from 'react-toastify';

import FuncionarioTable from '../../components/funcionario/FuncionarioTable'
import FuncionarioFilterNew from '../../components/funcionario/FuncionarioFilterNew'



const Funcionario = () => {
  const [listaFuncionarios, setListaFuncionarios] = useState([])
  const [listaEmpresa, setListaEmpresa] = useState([])
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [edit, setEdit] = useState(false)
  const [erase, setErase] = useState(false)
  const [selectedFuncionario, setSelectedFuncionario] = useState([])
  const [carregado, setCarregado] = useState(false)

  useEffect(()=> {
    if(!carregado) {
      getFuncionarioData(0,200, "")
    .then((response) => {
      setListaFuncionarios(response.data.content)
    })
    .catch((error) => {
      console.log(error)
      toast.error(`${error}`)
    })
      setCarregado(true)
    }
  },[carregado, listaFuncionarios])

  return (
    <PageContainer title="Funcionários" description="página para tratativa dos Funcionários">

      <DashboardCard title="Funcionários">
        <Typography>Funcionários Cadastrados</Typography>

        <BlankCard>
          <FuncionarioFilterNew setRows={setRows} loading={loading} setLoading={setLoading}
            listaFuncionarios={listaFuncionarios} setListaFuncionarios={setListaFuncionarios}
            listaEmpresa={listaEmpresa} setListaEmpresa={setListaEmpresa} edit={edit} setEdit={setEdit}
            erase={erase} setErase={setErase}
          />
          <CardContent>
            <FuncionarioTable rows={rows} setRows={setRows} loading={loading} setLoading={setLoading} edit={edit} setEdit={setEdit} erase={erase} setErase={setErase}
              selectedFuncionario={selectedFuncionario} setSelectedFuncionario={setSelectedFuncionario}
              listaEmpresa={listaEmpresa} setListaEmpresa={setListaEmpresa}
            />
          </CardContent>
        </BlankCard>

      </DashboardCard>
    </PageContainer>
  );
};

export default Funcionario;
