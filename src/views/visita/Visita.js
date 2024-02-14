import React from 'react';
import { Typography } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';


const Visita = () => {
  return (
    <PageContainer title="Visitas" description="página para tratativa das visitas">

      <DashboardCard title="Visitas">
        <Typography>Visitas Cadastradas</Typography>
      </DashboardCard>
    </PageContainer>
  );
};

export default Visita;
