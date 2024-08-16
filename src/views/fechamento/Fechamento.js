import React, { useEffect, useState } from 'react';
import { CardContent, Typography } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import FechamentoTable from 'src/components/fechamento/FechamentoTable';
import FechamentoFilterNew from 'src/components/fechamento/FechamentoFilterNew';
import { getClienteData } from 'src/api/Api';


const Fechamento = () => {
  const [listaClientes, setListaClientes] = useState();
  const [carregado, setCarregado] = useState(false);
  const [fechamentosCarregados, setFechamentosCarregados] = useState(false);
  const [edit, setEdit] = useState(false);
  

  useEffect(()=>{
    if(!carregado){
        getClienteData(0,400)
    .then((resCliente) => {
      setListaClientes(resCliente.data.content)
    })
    .catch((err) => {
      console.log(err)
    })
    }
  },[carregado])

  useEffect(()=> {
    // console.log(listaClientes)
  },[listaClientes])
  

  return (
    <PageContainer title="Fechamentos" description="página para tratativa dos fechamentos">

      <DashboardCard title="Fechamentos">
        <Typography>Fechamentos Cadastrados</Typography>
        
        <FechamentoFilterNew listaClientes={listaClientes} fechamentosCarregados={fechamentosCarregados} setFechamentosCarregados={setFechamentosCarregados} setEdit={setEdit} />
        <CardContent>
          <FechamentoTable listaClientes={listaClientes} fechamentosCarregados={fechamentosCarregados} setFechamentosCarregados={setFechamentosCarregados} 
            edit={edit} setEdit={setEdit} />
        </CardContent>
      </DashboardCard>
    </PageContainer>
  );
};

export default Fechamento;
