import React, { useEffect } from 'react';
import { Select, MenuItem } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import DashboardCard from '../../../components/shared/DashboardCard';
import Chart from 'react-apexcharts';
import { getVisitasPorMes } from '../../../api/Api';

const VisitasOverview = () => {
  const [month, setMonth] = React.useState(new Date().getMonth() + 1); // Define o mês atual como estado inicial
  const [diasUteis, setDiasUteis] = React.useState([]);
  const [visitasPorDia, setVisitasPorDia] = React.useState([]);
  const [seriesPorFuncionario, setSeriesPorFuncionario] = React.useState([]);

  useEffect(() => {
    // Chama handleChange com o mês atual quando o componente for montado
    handleChange({ target: { value: month } });
  }, []);

  const handleChange = async (event) => {
    const selectedMonth = event.target.value;
    setMonth(selectedMonth);
    const dias = getDiasUteisDoMes(selectedMonth);
    setDiasUteis(dias);

    // Chama a função da API para buscar as visitas do mês selecionado
    const anoAtual = new Date().getFullYear();
    const response = await getVisitasPorMes(selectedMonth, anoAtual); // Ajuste os valores de page e size conforme necessário
    // console.log(response.data.content);
    const visitas = response.data.content;

    // Processa os dados das visitas para obter o total por dia
    const visitasPorDia = processarVisitasPorDia(visitas, selectedMonth, anoAtual);
    console.log(visitasPorDia);
    setVisitasPorDia(visitasPorDia);

    // Processa os dados das visitas para obter o total por dia para cada funcionário
    const seriesPorFuncionario = processarVisitasPorFuncionario(visitas, selectedMonth, anoAtual);
    console.log(seriesPorFuncionario);
    setSeriesPorFuncionario(seriesPorFuncionario);
  };

  const getDiasUteisDoMes = (mes) => {
    const diasUteis = [];
    const dataAtual = new Date();
    const ano = dataAtual.getFullYear();
    const mesIndex = mes - 1; // Ajusta o mês para o índice correto (0-11)

    // Obter o último dia do mês
    const ultimoDia = new Date(ano, mesIndex + 1, 0).getDate();

    for (let dia = 1; dia <= ultimoDia; dia++) {
      const data = new Date(ano, mesIndex, dia);
      const diaSemana = data.getDay();
      // Verifica se o dia é útil (segunda a sexta-feira)
      if (diaSemana !== 0 && diaSemana !== 6) {
        diasUteis.push(dia);
      }
    }

    return diasUteis;
  };

  const processarVisitasPorDia = (visitas, mes, ano) => {
    const totalDias = new Date(ano, mes, 0).getDate();
    const visitasPorDia = Array(totalDias).fill(0);

    visitas.forEach((visita) => {
      const dia = new Date(visita.visitaInicio).getDate();
      visitasPorDia[dia - 1] += 1; // Incrementa o total de visitas no dia correspondente
    });

    // Filtra os dias com 0 visitas
    const visitasPorDiaFiltrado = visitasPorDia.filter((visitas) => visitas > 0);

    return visitasPorDiaFiltrado;
  };

  const processarVisitasPorFuncionario = (visitas, mes, ano) => {
    const totalDias = new Date(ano, mes, 0).getDate();
    const visitasPorFuncionario = {};

    visitas.forEach((visita) => {
      const dia = new Date(visita.visitaInicio).getDate();
      visita.funcionarios.forEach((funcionario) => {
        const funcionarioNome = funcionario.funcionarioNome;

        if (!visitasPorFuncionario[funcionarioNome]) {
          visitasPorFuncionario[funcionarioNome] = Array(totalDias).fill(0);
        }

        console.log('teste 1: ');
        console.log(funcionarioNome);
        console.log(visitasPorFuncionario[funcionarioNome]);

        visitasPorFuncionario[funcionarioNome][dia - 1] += 1; // Incrementa o total de visitas no dia correspondente para o funcionário
      });
    });

    // Converte o objeto em um array de séries para o gráfico
    const series = Object.keys(visitasPorFuncionario).map((funcionario) => ({
      name: funcionario,
      data: visitasPorFuncionario[funcionario].filter((visitas) => visitas > 0), // Filtra os dias com 0 visitas
    }));

    return series;
  };

  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const secondary = theme.palette.secondary.main;

  const optionscolumnchart = {
    chart: {
      type: 'bar',
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: '#adb0bb',
      toolbar: {
        show: true,
        tools: {
          download: true,
          selection: true,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: true,
          reset: true,
        },
      },
      height: 370,
      zoom: {
        enabled: true,
        type: 'xy', // Pode ser 'x', 'y' ou 'xy'
        autoScaleYaxis: false,
      },
      pan: {
        enabled: true,
        mode: 'x', // Pode ser 'x', 'y' ou 'xy'
        resetIcon: {
          offsetX: 0,
          offsetY: 0,
          fillColor: '#fff',
          strokeColor: '#37474F',
        },
      },
      selection: {
        enabled: true,
        type: 'x', // Pode ser 'x', 'y' ou 'xy'
        fill: {
          color: '#24292e',
          opacity: 0.1,
        },
        stroke: {
          width: 1,
          dashArray: 3,
          color: '#24292e',
          opacity: 0.4,
        },
        xaxis: {
          min: diasUteis[0], // Define o primeiro dia útil como valor mínimo
          max: diasUteis[diasUteis.length - 1], // Define o último dia útil como valor máximo,
        },
        yaxis: {
          min: undefined,
          max: undefined,
        },
      },
    },
    colors: [primary, secondary],
    plotOptions: {
      bar: {
        horizontal: false,
        barHeight: '60%',
        columnWidth: '42%',
        borderRadius: [6],
        borderRadiusApplication: 'end',
        borderRadiusWhenStacked: 'all',
      },
    },
    stroke: {
      show: true,
      width: 7,
      lineCap: 'butt',
      colors: ['transparent'],
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: true,
    },
    grid: {
      borderColor: 'rgba(0,0,0,0.1)',
      strokeDashArray: 3,
      xaxis: {
        lines: {
          show: true,
        },
      },
    },
    yaxis: {
      tickAmount: 8,
    },
    xaxis: {
      categories: diasUteis.map((dia) => `${dia}/${month}`), // Atualiza as categorias com os dias úteis
      axisBorder: {
        show: false,
      },
    },
    tooltip: {
      theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
      fillSeriesColor: false,
    },
  };

  const seriescolumnchart = [
    {
      name: 'Visitas',
      data: visitasPorDia, // Usa o array de visitas por dia
    },
    ...seriesPorFuncionario, // Adiciona as séries por funcionário
  ];

  return (
    <DashboardCard
      title="Visitas Overview"
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
      <Chart options={optionscolumnchart} series={seriescolumnchart} type="bar" height="370px" />
    </DashboardCard>
  );
};

export default VisitasOverview;
