import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { useTheme } from '@mui/material/styles';
import { Stack, Typography, Avatar, Fab } from '@mui/material';
import { IconArrowDownRight, IconCurrencyDollar } from '@tabler/icons';
import DashboardCard from '../../../components/shared/DashboardCard';
import { getVisitasValor } from '../../../api/Api';

const MonthlyEarnings = () => {
  const [valorVisitas, setValorVisitas] = useState(0);

  // chart color
  const theme = useTheme();
  const secondary = theme.palette.secondary.main;
  const secondarylight = '#f5fcff';
  const errorlight = '#fdede8';

  useEffect(() => {
    const fetchVisitasValor = async () => {
      try {
        await getVisitasValor().then((response) => {
          setValorVisitas(response.data);
        });
      } catch (error) {
        console.log(error);
      }
    };

    if (valorVisitas === 0) {
      fetchVisitasValor();
    }
  }, [valorVisitas]);

  // chart
  const optionscolumnchart = {
    chart: {
      type: 'area',
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: '#adb0bb',
      toolbar: {
        show: false,
      },
      height: 60,
      sparkline: {
        enabled: true,
      },
      group: 'sparklines',
    },
    stroke: {
      curve: 'smooth',
      width: 2,
    },
    fill: {
      colors: [secondarylight],
      type: 'solid',
      opacity: 0.05,
    },
    markers: {
      size: 0,
    },
    tooltip: {
      theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
    },
  };
  const seriescolumnchart = [
    {
      name: '',
      color: secondary,
      data: [25, 66, 20, 40, 12, 58, 20],
    },
  ];

  return (
    <DashboardCard
      title="Monthly Earnings"
      action={
        <Fab color="secondary" size="medium" sx={{ color: '#ffffff' }}>
          <IconCurrencyDollar width={24} />
        </Fab>
      }
      footer={
        <Chart options={optionscolumnchart} series={seriescolumnchart} type="area" height="60px" />
      }
    >
      <>
        {valorVisitas === 0 ? (
          <Typography variant="h3" fontWeight="700" mt="-20px">
            Carregando...
          </Typography>
        ) : (
          <>
            <Typography variant="h3" fontWeight="700" mt="-20px">
              {valorVisitas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </Typography>
            <Stack direction="row" spacing={1} my={1} alignItems="center"></Stack>
          </>
        )}
      </>
    </DashboardCard>
  );
};

export default MonthlyEarnings;
