import React from 'react';
import { Grid, Box } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';

// components
import VisitasOverview from './components/VisitasOverview';
import YearlyBreakup from './components/YearlyBreakup';
import RecentTransactions from './components/RecentTransactions';
import MonthlyEarnings from './components/MonthlyEarnings';
import FuncionariosHorasOverview from './components/FuncionariosHorasOverview';
import HorasPorFuncionarioPorDiaOverview from './components/HorasPorFuncionarioPorDiaOverview';

const Dashboard = () => {
  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Grid container spacing={3}>
              <Grid item xs={12} lg={4}>
                <YearlyBreakup />
              </Grid>
              <Grid item xs={12} lg={4}>
                <MonthlyEarnings />
              </Grid>
              <Grid item xs={12} lg={4}>
                <RecentTransactions />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={8} style={{ marginTop: '-170px' }}>
            <VisitasOverview />
          </Grid>

          <Grid item xs={12}>
            <HorasPorFuncionarioPorDiaOverview />
          </Grid>
          <Grid item xs={12}>
            <FuncionariosHorasOverview />
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Dashboard;
