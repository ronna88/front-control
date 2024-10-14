import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './FechamentoDetail.css'; // Importar o CSS para a página
import { getFechamentoById } from 'src/api/Api';

const FechamentoProdutoDetail = () => {
  const { fechamentoId } = useParams();
  const [fechamento, setFechamento] = useState(null);

  useEffect(() => {
    // Função para buscar os dados do fechamento
    const fetchFechamento = async () => {
      getFechamentoById(fechamentoId)
        .then((response) => {
          console.log(response.data);
          setFechamento(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    fetchFechamento();
  }, [fechamentoId]);

  const handlePrint = () => {
    window.print();
  };

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
              <th style={{ borderTop: '1px solid #000' }}>
                Descritivo de Visita com os PRODUTOS utilizados
              </th>
              <th style={{ borderTop: '1px solid #000' }}>Valor dos Produtos</th>
            </tr>
            {/* Linha vazia como espaçador para páginas subsequentes */}
          </thead>
          <tbody>
            {fechamento.visitas && fechamento.visitas.length > 0 ? (
              fechamento.visitas.map((visita) => (
                <>
                  {visita.visitaValorProdutos > 0 && (
                    <tr key={visita.visitaId}>
                      <td>{new Date(visita.visitaInicio).toLocaleString()}</td>
                      <td>{new Date(visita.visitaFinal).toLocaleString()}</td>
                      <td>{visita.local.localNome}</td>
                      <td className="descServico">{visita.visitaDescricao}</td>
                      <td>
                        {visita.visitaValorProdutos.toLocaleString('pt-br', {
                          style: 'currency',
                          currency: 'BRL',
                        })}
                      </td>
                    </tr>
                  )}
                </>
              ))
            ) : (
              <tr>
                <td colSpan="4">Nenhuma visita disponível</td>
              </tr>
            )}
            <tr>
              <td colSpan="3" align="right">
                <strong>Total dos Produtos Utilizados</strong>
              </td>
              <td>
                {fechamento.fechamentoValorProdutos.toLocaleString('pt-br', {
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

export default FechamentoProdutoDetail;
