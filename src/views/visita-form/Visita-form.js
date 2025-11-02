import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from 'src/components/shared/DashboardCard';
import VisitaForm from 'src/components/visita/VisitaForm';
import { useState } from 'react';

const VisitaFormPage = () => {
  const [listaClientes, setListaClientes] = useState([]);
  const [listaFuncionarios, setListaFuncionarios] = useState([]);

  return (
    <>
      <PageContainer title="Nova Visita" description="Formulário de cadastro de nova visita">
        <DashboardCard title="Nova Visita">
          Formulário de cadastro de nova visita
          <VisitaForm />
        </DashboardCard>
      </PageContainer>
    </>
  );
};

export default VisitaFormPage;
