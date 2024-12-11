import React, { useEffect } from 'react';
import DashboardCard from '../../../components/shared/DashboardCard';
import {
  Timeline,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
  TimelineDot,
  TimelineConnector,
  TimelineContent,
  timelineOppositeContentClasses,
} from '@mui/lab';
import { Typography } from '@mui/material';
import { getContagemVisitas } from 'src/api/Api';

const RecentTransactions = () => {
  const [listaClienteVisitas, setListaClienteVisitas] = React.useState([]);

  const periodo = {
    periodoInicio: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    periodoFinal: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
  };
  /* const periodoMesAnterior = {
    periodoInicio: new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1),
    periodoFinal: new Date(new Date().getFullYear(), new Date().getMonth(), 0),
  };
  */

  useEffect(() => {
    getContagemVisitas(periodo)
      .then((response) => {
        // console.log(response.data);
        setListaClienteVisitas(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <DashboardCard title="Clientes com mais Visitas">
      <>
        <Timeline
          className="theme-timeline"
          nonce={undefined}
          onResize={undefined}
          onResizeCapture={undefined}
          sx={{
            p: 0,
            mb: '-40px',
            '& .MuiTimelineConnector-root': {
              width: '1px',
              backgroundColor: '#efefef',
            },
            [`& .${timelineOppositeContentClasses.root}`]: {
              flex: 0.5,
              paddingLeft: 0,
            },
          }}
        >
          {listaClienteVisitas.map((row) => (
            <TimelineItem key={row.cliente.clienteId}>
              <TimelineOppositeContent>{row.cliente.clienteNome}</TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot color="secondary" variant="outlined" />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                <Typography fontWeight="600">{row.totalVisitas}</Typography>{' '}
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </>
    </DashboardCard>
  );
};

export default RecentTransactions;
