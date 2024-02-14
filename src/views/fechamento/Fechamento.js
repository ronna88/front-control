import React from 'react';
import { Typography } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';


const Fechamento = () => {
  return (
    <PageContainer title="Fechamentos" description="página para tratativa dos fechamentos">

      <DashboardCard title="Fechamentos">
        <Typography>Fechamentos Cadastrados</Typography>
      </DashboardCard>
    </PageContainer>
  );
};

export default Fechamento;
