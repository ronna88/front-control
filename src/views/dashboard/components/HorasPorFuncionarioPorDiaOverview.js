import React, { useEffect } from 'react';
import { Select, MenuItem } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import DashboardCard from '../../../components/shared/DashboardCard';
import Chart from 'react-apexcharts';
import { getVisitasPorMes } from '../../../api/Api';

const HorasPorFuncionarioPorDiaOverview = ({ year }) => {
  const [month, setMonth] = React.useState(new Date().getMonth() + 1);
  const [totalHorasPorFuncionarioPorDia, setTotalHorasPorFuncionarioPorDia] = React.useState({
    series: [],
    categories: [],
  });

  useEffect(() => {
    handleChange({ target: { value: month } });
  }, []);

  const handleChange = async (event) => {
    const selectedMonth = event.target.value;
    setMonth(selectedMonth);

    let anoAtual;
    if (!year) {
      anoAtual = new Date().getFullYear();
    } else {
      anoAtual = year;
    }
    const response = await getVisitasPorMes(selectedMonth, anoAtual);
    const visitas = response.data.content;

    const totalHoras = processarTotalHorasPorFuncionarioPorDia(visitas);
    setTotalHorasPorFuncionarioPorDia(totalHoras);
  };

  const processarTotalHorasPorFuncionarioPorDia = (visitas) => {
    const totalHoras = {};

    visitas.forEach((visita) => {
      const dia = new Date(visita.visitaInicio).getDate();
      visita.funcionarios.forEach((funcionario) => {
        const funcionarioNome = funcionario.funcionarioNome;
        const duracaoHoras = visita.visitaTotalHoras;

        if (!totalHoras[dia]) {
          totalHoras[dia] = {};
        }

        if (!totalHoras[dia][funcionarioNome]) {
          totalHoras[dia][funcionarioNome] = 0;
        }

        totalHoras[dia][funcionarioNome] += duracaoHoras;
      });
    });

    const series = [];
    const categories = Object.keys(totalHoras).sort((a, b) => a - b);

    const funcionarios = new Set();
    categories.forEach((dia) => {
      Object.keys(totalHoras[dia]).forEach((funcionario) => {
        funcionarios.add(funcionario);
      });
    });

    funcionarios.forEach((funcionario) => {
      const data = categories.map((dia) => totalHoras[dia][funcionario] || 0);
      series.push({ name: funcionario, data });
    });

    return { series, categories };
  };

  const theme = useTheme();
  const primary = theme.palette.primary.main;

  // Define a custom color palette
  const colors = [
    '#FF5733',
    '#33FF57',
    '#3357FF',
    '#FF33A1',
    '#A133FF',
    '#33FFF5',
    '#FF8C33',
    '#8C33FF',
    '#33FF8C',
    '#FF3333',
  ];

  const optionsBarChart = {
    chart: {
      type: 'bar',
      height: 350,
      stacked: true,
    },
    plotOptions: {
      bar: {
        horizontal: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: totalHorasPorFuncionarioPorDia.categories,
    },
    colors: colors,
  };

  return (
    <DashboardCard
      title="Total de Horas de Visitas por Funcionário por Dia"
      action={
        <Select labelId="month-dd" id="month-dd" value={month} size="small" onChange={handleChange}>
          <MenuItem value={1}>Janeiro</MenuItem>
          <MenuItem value={2}>Fevereiro</MenuItem>
          <MenuItem value={3}>Março</MenuItem>
          <MenuItem value={4}>Abril</MenuItem>
          <MenuItem value={5}>Maio</MenuItem>
          <MenuItem value={6}>Junho</MenuItem>
          <MenuItem value={7}>Julho</MenuItem>
          <MenuItem value={8}>Agosto</MenuItem>
          <MenuItem value={9}>Setembro</MenuItem>
          <MenuItem value={10}>Outubro</MenuItem>
          <MenuItem value={11}>Novembro</MenuItem>
          <MenuItem value={12}>Dezembro</MenuItem>
        </Select>
      }
    >
      <Chart
        options={optionsBarChart}
        series={totalHorasPorFuncionarioPorDia.series}
        type="bar"
        height="350px"
      />
    </DashboardCard>
  );
};

export default HorasPorFuncionarioPorDiaOverview;
