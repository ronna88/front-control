import React, { useEffect } from 'react';
import Chart from 'react-apexcharts';
import { useTheme } from '@mui/material/styles';
import { Grid, Stack, Typography, Avatar } from '@mui/material';
import { IconArrowUpLeft, IconArrowDownRight } from '@tabler/icons';

import DashboardCard from '../../../components/shared/DashboardCard';
import { getAnaliseVisitas } from 'src/api/Api';
import { get } from 'lodash';

// TODO: colocar para pegar os dados das visitas do backend do mês atual e do mês anterior, para fazer a comparação e mostrar no gráfico
// o total de visitas
const YearlyBreakup = () => {
  const [totalVisitas, setTotalVisitas] = React.useState(0);
  const [totalVisitasMesAnterior, setTotalVisitasMesAnterior] = React.useState(0);

  // chart color
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const primarylight = '#ecf2ff';
  const successlight = theme.palette.success.light;

  const periodo = {
    periodoInicio: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    periodoFinal: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
  };
  const periodoMesAnterior = {
    periodoInicio: new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1),
    periodoFinal: new Date(new Date().getFullYear(), new Date().getMonth(), 0),
  };

  useEffect(() => {
    getAnaliseVisitas(periodo)
      .then((response) => {
        console.log('asdjlasdjksdfdfhlasfhlsjfhljdfhjfhçfjkdjfjsçjç');
        console.log(response.data);
        setTotalVisitas(response.data);
      })
      .catch((error) => {
        console.log('deu muito ruim');
        console.log(error);
      });

    getAnaliseVisitas(periodoMesAnterior)
      .then((res) => {
        console.log('asdjlasdjksdfdfhlasfhlsjfhljdfhjfhçfjkdjfjsçjç');
        console.log(res.data);
        setTotalVisitasMesAnterior(res.data);
      })
      .catch((err) => {
        console.log('deu muito ruim');
        console.log(err);
      });
  }, [totalVisitas]);

  // chart
  const optionscolumnchart = {
    chart: {
      type: 'donut',
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: '#adb0bb',
      toolbar: {
        show: false,
      },
      height: 155,
    },
    colors: [primary, primarylight, '#F9F9FD'],
    plotOptions: {
      pie: {
        startAngle: 0,
        endAngle: 360,
        donut: {
          size: '75%',
          background: 'transparent',
        },
      },
    },
    tooltip: {
      theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
      fillSeriesColor: false,
    },
    stroke: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    responsive: [
      {
        breakpoint: 991,
        options: {
          chart: {
            width: 120,
          },
        },
      },
    ],
  };
  const seriescolumnchart = [totalVisitas, totalVisitasMesAnterior];

  return (
    <DashboardCard title="Tendência do Mês">
      <Grid container spacing={3}>
        {/* column */}
        <Grid item xs={7} sm={7}>
          <Typography variant="h3" fontWeight="700">
            {totalVisitas}
          </Typography>
          <Stack direction="row" spacing={1} mt={1} alignItems="center">
            <Avatar sx={{ bgcolor: successlight, width: 27, height: 27 }}>
              {(
                ((totalVisitas / new Date().getDate() - totalVisitasMesAnterior / 30) /
                  totalVisitasMesAnterior) *
                100
              ).toFixed(2) > 0 ? (
                <IconArrowUpLeft width={20} color="#39B69A" />
              ) : (
                <IconArrowDownRight width={20} color="#FA896B" />
              )}
            </Avatar>
            <Typography variant="subtitle2" fontWeight="600">
              {(
                ((totalVisitas / new Date().getDate() - totalVisitasMesAnterior / 30) /
                  totalVisitasMesAnterior) *
                100
              ).toFixed(2)}
              %
            </Typography>
            <Typography variant="subtitle2" color="textSecondary">
              vs. mês anterior
            </Typography>
          </Stack>
          <Stack spacing={3} mt={5} direction="row">
            <Stack direction="row" spacing={1} alignItems="center">
              <Avatar
                sx={{ width: 9, height: 9, bgcolor: primary, svg: { display: 'none' } }}
              ></Avatar>
              <Typography variant="subtitle2" color="textSecondary">
                {periodo.periodoInicio.toLocaleString('default', { month: 'long' })}
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              <Avatar
                sx={{ width: 9, height: 9, bgcolor: primarylight, svg: { display: 'none' } }}
              ></Avatar>
              <Typography variant="subtitle2" color="textSecondary">
                {periodoMesAnterior.periodoInicio.toLocaleString('default', {
                  month: 'long',
                  month: 'long',
                })}
              </Typography>
            </Stack>
          </Stack>
        </Grid>
        {/* column */}
        <Grid item xs={5} sm={5}>
          <Chart
            options={optionscolumnchart}
            series={seriescolumnchart}
            type="donut"
            height="150px"
          />
        </Grid>
      </Grid>
    </DashboardCard>
  );
};

export default YearlyBreakup;
