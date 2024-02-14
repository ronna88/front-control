import React from 'react';
import { Typography } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';


const PF = () => {
  return (
    <PageContainer title="Cliente PF" description="página para tratativa dos clientes PF's">

      <DashboardCard title="Cliente PF">
        <Typography>Clientes PF Cadastradas</Typography>
      </DashboardCard>
    </PageContainer>
  );
};

export default PF;
