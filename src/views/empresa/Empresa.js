import React, { useState, useEffect } from 'react';
import {
  CardContent,
  Typography
} from '@mui/material';

import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import BlankCard from '../../components/shared/BlankCard';

import EmpresaTable from '../../components/empresa/EmpresaTable'
import EmpresaFilterNew from '../../components/empresa/EmpresaFilterNew'


const Empresa = () => {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [edit, setEdit] = useState(false)
  const [erase, setErase] = useState(false)


  return (
    <PageContainer title="Empresa" description="página para tratativa das empresas">
      <DashboardCard title="Empresa">
        <Typography>Empresas Cadastradas</Typography>
        <BlankCard>
          <EmpresaFilterNew setRows={setRows} loading={loading} setLoading={setLoading} />
          <CardContent>
            <EmpresaTable rows={rows} setRows={setRows} loading={loading} setLoading={setLoading}
              edit={edit} setEdit={setEdit} erase={erase} setErase={setErase}/>
          </CardContent>
        </BlankCard>
      </DashboardCard>
    </PageContainer>
  );
};

export default Empresa;
