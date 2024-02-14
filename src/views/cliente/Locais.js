import React from 'react';
import { Typography } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';


const Locais = () => {
  return (
    <PageContainer title="Locais" description="página para tratativa dos locais">

      <DashboardCard title="Locais">
        <Typography>Locais Cadastrados</Typography>
      </DashboardCard>
    </PageContainer>
  );
};

export default Locais;
