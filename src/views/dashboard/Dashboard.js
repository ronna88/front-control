import React, { useEffect, useState } from 'react';
import { Grid, Box } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import { getVisitasValor } from '../../api/Api';

// components
import VisitasOverview from './components/VisitasOverview';
import YearlyBreakup from './components/YearlyBreakup';
import RecentTransactions from './components/RecentTransactions';
import MonthlyEarnings from './components/MonthlyEarnings';
import FuncionariosHorasOverview from './components/FuncionariosHorasOverview';
import HorasPorFuncionarioPorDiaOverview from './components/HorasPorFuncionarioPorDiaOverview';

const Dashboard = () => {
  const [valorServicos, setValorServicos] = useState(0);
  const [valorProdutos, setValorProdutos] = useState(0);

  useEffect(() => {
    const fetchVisitasValor = async () => {
      try {
        await getVisitasValor().then((response) => {
          setValorServicos(response.data.valorServico);
          setValorProdutos(response.data.valorProduto);
          console.log(response.data);
        });
      } catch (error) {
        console.log(error);
      }
    };

    if (valorServicos === 0) {
      fetchVisitasValor();
    }
  }, [valorServicos]);
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
                <MonthlyEarnings valorServicos={valorServicos} />
              </Grid>
              <Grid item xs={12} lg={4}>
                <MonthlyEarnings valorProdutos={valorProdutos} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={3}>
              <Grid item xs={12} lg={8}>
                <VisitasOverview />
              </Grid>
              <Grid item xs={12} lg={4}>
                <RecentTransactions />
              </Grid>
            </Grid>
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
