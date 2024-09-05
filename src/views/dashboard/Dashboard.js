import React from 'react';
import { Grid, Box } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';

// components
import VisitasOverview from './components/VisitasOverview';
import YearlyBreakup from './components/YearlyBreakup';
import RecentTransactions from './components/RecentTransactions';
import ProductPerformance from './components/ProductPerformance';
import Blog from './components/Blog';
import MonthlyEarnings from './components/MonthlyEarnings';
import FuncionarioPerformance from './components/FuncionarioPerformance';
import FuncionariosHorasOverview from './components/FuncionariosHorasOverview';
import HorasPorFuncionarioPorDiaOverview from './components/HorasPorFuncionarioPorDiaOverview';


const Dashboard = () => {
  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={8}>
            <VisitasOverview />
          </Grid>
          <Grid item xs={12} lg={4}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <YearlyBreakup />
              </Grid>
              <Grid item xs={12}>
                <MonthlyEarnings />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} lg={8}>
            <HorasPorFuncionarioPorDiaOverview />
          </Grid>
          <Grid item xs={12} lg={4}>
            <RecentTransactions />
          </Grid>
          <Grid item xs={12} lg={8}>
            <FuncionariosHorasOverview />
          </Grid>
          <Grid item xs={12}>
            <Blog />
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Dashboard;
