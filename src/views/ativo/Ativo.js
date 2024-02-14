import React from 'react';
import { Typography } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';


const Ativo = () => {
  return (
    <PageContainer title="Ativos" description="página para tratativa dos ativos">

      <DashboardCard title="Ativos">
        <Typography>Ativos Cadastradas</Typography>
      </DashboardCard>
    </PageContainer>
  );
};

export default Ativo;
