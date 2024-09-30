import React, { useEffect } from 'react';
import { Select, MenuItem } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import DashboardCard from '../../../components/shared/DashboardCard';
import Chart from 'react-apexcharts';
import { getVisitasPorMes } from '../../../api/Api'; 

const FuncionariosHorasOverview = () => {
    const [month, setMonth] = React.useState(new Date().getMonth() + 1);
    const [totalHorasPorFuncionario, setTotalHorasPorFuncionario] = React.useState([]);

    useEffect(() => {
        handleChange({ target: { value: month } });
    }, []);

    const handleChange = async (event) => {
        const selectedMonth = event.target.value;
        setMonth(selectedMonth);

        const anoAtual = new Date().getFullYear();
        const response = await getVisitasPorMes(selectedMonth, anoAtual);
        const visitas = response.data.content;
        console.log(response)

        const totalHoras = processarTotalHorasPorFuncionario(visitas);
        setTotalHorasPorFuncionario(totalHoras);
    };

    const processarTotalHorasPorFuncionario = (visitas) => {
        const totalHoras = {};

        visitas.forEach(visita => {
            visita.funcionarios.forEach(funcionario => {
                const funcionarioNome = funcionario.funcionarioNome;
                const duracaoHoras = visita.visitaTotalHoras;

                if (!totalHoras[funcionarioNome]) {
                    totalHoras[funcionarioNome] = 0;
                }

                totalHoras[funcionarioNome] += duracaoHoras;
            });
        });

        return Object.keys(totalHoras).map(funcionario => ({
            name: funcionario,
            totalHoras: totalHoras[funcionario]
        }));
    };

    const theme = useTheme();
    const primary = theme.palette.primary.main;

    const optionsBarChart = {
        chart: {
            type: 'bar',
            height: 350,
        },
        plotOptions: {
            bar: {
                horizontal: true,
            },
        },
        dataLabels: {
            enabled: false,
        },
        xaxis: {
            categories: totalHorasPorFuncionario.map(item => item.name),
        },
        colors: [primary],
    };

    const seriesBarChart = [
        {
            name: 'Total Horas',
            data: totalHorasPorFuncionario.map(item => item.totalHoras),
        },
    ];

    return (
        <DashboardCard title="Total de Horas de Visitas por Funcionário" action={
            <Select
                labelId="month-dd"
                id="month-dd"
                value={month}
                size="small"
                onChange={handleChange}
            >
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
        }>
            <Chart
                options={optionsBarChart}
                series={seriesBarChart}
                type="bar"
                height="350px"
            />
        </DashboardCard>
    );
};

export default FuncionariosHorasOverview;