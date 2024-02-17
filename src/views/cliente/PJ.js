import React, { useState, useEffect } from 'react';
import {
  CardContent,
  Typography
} from '@mui/material';

import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import BlankCard from '../../components/shared/BlankCard';

import PJTable from '../../components/cliente/pj/PJTable'
import PJFilterNew from '../../components/cliente/pj/PJFilterNew'


const PJ = () => {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [edit, setEdit] = useState(false)
  const [erase, setErase] = useState(false)


  return (
    <PageContainer title="Cliente PJ" description="página para tratativa dos clientes PJ">
      <DashboardCard title="Clientes PJ">
        <Typography>Clientes PJ Cadastrados</Typography>
        <BlankCard>
          <PJFilterNew setRows={setRows} loading={loading} setLoading={setLoading} />
          <CardContent>
            <PJTable rows={rows} setRows={setRows} loading={loading} setLoading={setLoading} edit={edit} setEdit={setEdit} erase={erase} setErase={setErase}/>
          </CardContent>
        </BlankCard>
      </DashboardCard>
    </PageContainer>
    );
};

export default PJ;
