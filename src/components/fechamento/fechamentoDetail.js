import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './FechamentoDetail.css'; // Importar o CSS para a página
import { getFechamentoById } from 'src/api/Api';

const FechamentoDetail = () => {
  const { fechamentoId } = useParams();
  const [fechamento, setFechamento] = useState(null);

  useEffect(() => {
    // Função para buscar os dados do fechamento
    const fetchFechamento = async () => {
      console.log('Carregando dados do fechamento...');
      getFechamentoById(fechamentoId)
        .then((response) => {
          // console.log(response);
          setFechamento(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    fetchFechamento();
  }, [fechamentoId]);

  if (!fechamento) return <div>Carregando...</div>;

  return (
    <div className="container-print">
      <div className="print-header">
        <div className="headerImg">
          <img src="https://suxberger.com.br/imagens/cabe%C3%A7alhoFechamentoSux.jpg" />
        </div>
      </div>
      <div>
        <table className="fechamento-detail">
          <thead>
            <tr className="page-break-before">
              <td
                colSpan="4"
                style={{
                  height: '150px',
                  borderBottom: '1px solid #000;',
                  borderRight: '1px solid #fff',
                  borderLeft: '1px solid #fff',
                  borderTop: '1px solid #fff',
                }}
              ></td>{' '}
              {/* Ajuste a altura conforme necessário */}
            </tr>
            <tr>
              <th style={{ borderTop: '1px solid #000' }}>Início</th>
              <th style={{ borderTop: '1px solid #000' }}>Término</th>
              <th style={{ borderTop: '1px solid #000' }}>Local</th>
              <th style={{ borderTop: '1px solid #000' }}>Serviços</th>
              <th style={{ borderTop: '1px solid #000' }}>Horas</th>
            </tr>
            {/* Linha vazia como espaçador para páginas subsequentes */}
          </thead>
          <tbody>
            {fechamento.visitas && fechamento.visitas.length > 0 ? (
              fechamento.visitas
                .sort((a, b) => new Date(a.visitaInicio) - new Date(b.visitaInicio)) // Ordena as visitas por data de início
                .map((visita) => (
                  <tr key={visita.visitaId}>
                    <td
                      style={{
                        color: visita.visitaTotalAbono > 0 ? 'red' : 'black',
                      }}
                    >
                      {new Date(visita.visitaInicio).toLocaleString()}
                    </td>
                    <td
                      style={{
                        color: visita.visitaTotalAbono > 0 ? 'red' : 'black',
                      }}
                    >
                      {new Date(visita.visitaFinal).toLocaleString()}
                    </td>
                    <td
                      style={{
                        color: visita.visitaTotalAbono > 0 ? 'red' : 'black',
                      }}
                    >
                      {visita.local.localNome}
                    </td>
                    <td
                      className="descServico"
                      style={{
                        color: visita.visitaTotalAbono > 0 || visita.visitaRemoto ? 'red' : 'black',
                      }}
                    >
                      {visita.visitaDescricao}
                    </td>
                    <td
                      style={{
                        color: visita.visitaTotalAbono > 0 ? 'red' : 'black',
                      }}
                    >
                      {(visita.visitaTotalHoras - visita.visitaTotalAbono)
                        .toFixed(2)
                        .replace('.', ',')}
                    </td>
                  </tr>
                ))
            ) : (
              <tr>
                <td colSpan="4">Nenhuma visita disponível</td>
              </tr>
            )}
            <tr>
              <td colSpan="3" align="right">
                Total de Serviços
              </td>
              <td>
                {fechamento.fechamentoValorServicos.toLocaleString('pt-br', {
                  style: 'currency',
                  currency: 'BRL',
                })}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FechamentoDetail;
