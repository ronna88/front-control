import React from 'react';
import { Typography } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';


const Empresa = () => {
  return (
    <PageContainer title="Empresa" description="página para tratativa das empresas">

      <DashboardCard title="Empresa">
        <Typography>Empresas Cadastradas</Typography>
      </DashboardCard>
    </PageContainer>
  );
};

export default Empresa;
