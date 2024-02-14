import React from 'react';
import { Typography } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';


const PJ = () => {
  return (
    <PageContainer title="Clientes PJ" description="página para tratativa dos clientes PJ's">

      <DashboardCard title="Clientes PJ">
        <Typography>Clientes PJ Cadastradas</Typography>
      </DashboardCard>
    </PageContainer>
  );
};

export default PJ;
