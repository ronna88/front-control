import React from 'react';
import { CardContent, Typography } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import VisitaFilterNew from '../../components/visita/VisitaFilterNew';
import BlankCard from '../../components/shared/BlankCard';


const Visita = () => {
  return (
    <PageContainer title="Visitas" description="página para tratativa das visitas">

      <DashboardCard title="Visitas">
        <Typography>Visitas Cadastradas</Typography>

        <BlankCard>
          <VisitaFilterNew />

          <CardContent>
            <h6>Card Content -> Tabela de visitas</h6>
          </CardContent>
        </BlankCard>
      </DashboardCard>
    </PageContainer>
  );
};

export default Visita;
