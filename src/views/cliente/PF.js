import React, { useState } from 'react';
import {
  CardContent,
  Typography
} from '@mui/material';

import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import BlankCard from '../../components/shared/BlankCard';

import PFTable from '../../components/cliente/pf/PFTable'
import PFFilterNew from '../../components/cliente/pf/PFFilterNew'


const PF = () => {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [edit, setEdit] = useState(false)
  const [erase, setErase] = useState(false)


  return (
    <PageContainer title="Cliente PF" description="página para tratativa dos clientes PF">
      <DashboardCard title="Clientes PF">
        <Typography>Clientes PF Cadastrados</Typography>
        <BlankCard>
          <PFFilterNew setRows={setRows} loading={loading} setLoading={setLoading} />
          <CardContent>
            <PFTable rows={rows} setRows={setRows} loading={loading} setLoading={setLoading} edit={edit} setEdit={setEdit} erase={erase} setErase={setErase}/>
          </CardContent>
        </BlankCard>
      </DashboardCard>
    </PageContainer>
    );
};

export default PF;
