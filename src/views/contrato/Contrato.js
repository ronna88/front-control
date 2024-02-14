import React from 'react';
import { Typography } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';


const Contrato = () => {
  return (
    <PageContainer title="Contratos" description="página para tratativa dos contratos">

      <DashboardCard title="Contratos">
        <Typography>Contratos Cadastrados</Typography>
      </DashboardCard>
    </PageContainer>
  );
};

export default Contrato;
