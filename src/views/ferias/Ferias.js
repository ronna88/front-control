
import { Typography } from '@mui/material';
import BlankCard from 'src/components/shared/BlankCard';
import DashboardCard from 'src/components/shared/DashboardCard';

const { default: PageContainer } = require('src/components/container/PageContainer');

const Ferias = () => {
  return (
    <PageContainer title="Férias" description="Página para acompanhamento de férias">
      <DashboardCard title="Férias">
        <Typography>Férias</Typography>

        <BlankCard>
          <Typography>Em desenvolvimento...</Typography>
        </BlankCard>
      </DashboardCard>
    </PageContainer>
  );
};

export default Ferias;
