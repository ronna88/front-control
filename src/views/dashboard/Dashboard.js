import React, { useEffect, useState } from 'react';
import { Grid, Box, Select, MenuItem } from '@mui/material';
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
  const [year, setYear] = React.useState(new Date().getFullYear());

  const handleChange = async (event) => {
    const selectedMonth = event.target.value;
    setYear(selectedMonth);
  };

  useEffect(() => {
    handleChange({ target: { value: year } });
  }, []);

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
        <Select labelId="month-dd" id="month-dd" value={year} size="small" onChange={handleChange}>
          <MenuItem value={2024}>2024</MenuItem>
          <MenuItem value={2025}>2025</MenuItem>
        </Select>
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
                <VisitasOverview year={year} />
              </Grid>
              <Grid item xs={12} lg={4}>
                <RecentTransactions year={year} />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <HorasPorFuncionarioPorDiaOverview year={year} />
          </Grid>
          <Grid item xs={12}>
            <FuncionariosHorasOverview year={year} />
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Dashboard;
