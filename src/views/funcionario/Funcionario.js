import React from 'react';
import { Typography } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';


const Funcionario = () => {
  return (
    <PageContainer title="Funcionarios" description="página para tratativa dos funcionarios">

      <DashboardCard title="Funcionarios">
        <Typography>Funcionarios Cadastrados</Typography>
      </DashboardCard>
    </PageContainer>
  );
};

export default Funcionario;
