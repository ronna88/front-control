import React, { useState, useEffect } from 'react';
import { Typography, CardContent } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import BlankCard from '../../components/shared/BlankCard';

import AtivoTable from '../../components/ativo/AtivoTable'
import AtivoFilterNew from '../../components/ativo/AtivoFilterNew'

const Ativo = () => {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [edit, setEdit] = useState(false)
  const [erase, setErase] = useState(false)

  return (
    <PageContainer title="Ativos" description="página para tratativa dos ativos">

      <DashboardCard title="Ativos">
        <Typography>Ativos Cadastradas</Typography>
        <BlankCard>
          <AtivoFilterNew setRows={setRows} loading={loading} setLoading={setLoading} setEdit={setEdit} setErase={setErase} />
          <CardContent>
            <AtivoTable rows={rows} setRows={setRows} loading={loading} setLoading={setLoading} edit={edit} setEdit={setEdit} erase={erase} setErase={setErase}/>
          </CardContent>
        </BlankCard>
      </DashboardCard>
    </PageContainer>
  );
};

export default Ativo;
