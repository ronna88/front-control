import React, { useState } from 'react';
import { Typography, CardContent } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import BlankCard from '../../components/shared/BlankCard';

import LocacaoTable from '../../components/contrato-locacao/LocacaoTable';
import LocacaoFilterNew from 'src/components/contrato-locacao/LocacaoFilterNew';

const Locacao = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [edit, setEdit] = useState(false);
  const [erase, setErase] = useState(false);

  return (
    <PageContainer title="Locações" description="página para tratativa das locações">
      <DashboardCard title="Locações">
        <Typography>Contratos de Locações</Typography>
        <BlankCard>
          <LocacaoFilterNew
            setRows={setRows}
            loading={loading}
            setLoading={setLoading}
            setEdit={setEdit}
            setErase={setErase}
          />
          <CardContent>
            <LocacaoTable
              rows={rows}
              setRows={setRows}
              loading={loading}
              setLoading={setLoading}
              edit={edit}
              setEdit={setEdit}
              erase={erase}
              setErase={setErase}
            />
          </CardContent>
        </BlankCard>
      </DashboardCard>
    </PageContainer>
  );
};

export default Locacao;
