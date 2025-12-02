import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { deleteFechamento, getFechamentos } from 'src/api/Api';
import { useTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import Box from '@mui/material/Box';
import {
  IconEdit,
  IconTrash,
  IconStatusChange,
  IconPrinter,
  IconShoppingCart,
} from '@tabler/icons';
import IconButton from '@mui/material/IconButton';
import ModalForm from './ModalForm';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { formatInTimeZone } from 'date-fns-tz';
import ModalStatusForm from './ModalStatusForm';

/*
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50%',
  bgcolor: 'background.paper',
  border: '2px solid #dcdcdc',
  borderRadius: 6,
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  gap: '3px',
};
*/

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

const FechamentoTable = ({
  listaClientes,
  fechamentosCarregados,
  setFechamentosCarregados,
  edit,
  setEdit,
  fechamentos,
  setFechamentos,
}) => {
  const handleOpen = () => setOpen(true);
  const handleStatusOpen = () => setStatusOpen(true);
  const handleClose = () => setOpen(false);
  const handleStatusClose = () => setStatusOpen(false);
  const [open, setOpen] = useState(false);
  const [statusOpen, setStatusOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(200);
  const [sort, setSort] = useState('fechamentoInicio');
  const [form, setForm] = useState({
    cliente: '',
    clienteLocalId: '',
    fechamentoInicio: '',
    fechamentoFinal: '',
  });
  const [statusForm, setStatusForm] = useState({
    fechamentoId: '',
    fechamentoStatus: '',
  });
  const navigate = useNavigate();

  console.log(setSort);

  useEffect(() => {
    if (!fechamentosCarregados) {
      setFechamentosCarregados(true);
      const direction = 'DESC';
      getFechamentos(page, rowsPerPage, sort, direction)
        .then((response) => {
          console.log(response);
          setFechamentos(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    if (fechamentos) {
      console.log(fechamentos);
    }
  }, [fechamentosCarregados, fechamentos]);

  useEffect(() => {
    console.log(fechamentos);
    console.log(!fechamentosCarregados);
  }, [fechamentos]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value));
    setPage(0);
  };

  function handlePrintAntigo(fechamento) {
    if (!fechamento || !fechamento.fechamentoId) {
      console.error('Fechamento inválido');
      toast.error('Fechamento inválido!');
      return;
    }
    navigate(`/fechamento/${fechamento.fechamentoId}`, { state: { fechamento } });
  }

  async function handlePrintClick(fechamento) {
    if (!fechamento || !fechamento.fechamentoId) {
      console.error('Fechamento inválido');
      toast.error('Fechamento inválido!');
      return;
    }
    // navigate(`/fechamento/${fechamento.fechamentoId}`, { state: { fechamento } });
    try {
      const res = await fetch(
        `https://${process.env.REACT_APP_URL}/fechamento/imprimir/${fechamento.fechamentoId}`,
        { method: 'POST' },
      );

      if (!res.ok) {
        const text = await res.text();
        console.error('Erro ao gerar PDF:', text);
        toast.error('Erro ao gerar PDF!');

        const t = JSON.parse(text);
        if (t.message) {
          toast.error(t.message);
        }
        return;
      }

      const blob = await res.blob();

      const contentType = res.headers.get('content-type') || '';
      if (!contentType.includes('application/pdf')) {
        console.error('Resposta não é PDF, content-type:', contentType);
        toast.error('Resposta do servidor não é um PDF!');
        return;
      }

      const dataAtual = new Date();
      /*const dataFormatada = dataAtual
        .toISOString()
        .replace(/T/, '_')
        .replace(/:/g, '-')
        .split('.')[0];
        
*/
      const dataMesAnterior = new Date(dataAtual.getFullYear(), dataAtual.getMonth() - 1, 1);
      const dataFormatada = dataAtual.toLocaleDateString('pt-BR').replace(/\//g, '.');
      const mesRef =
        dataMesAnterior.toLocaleString('pt-BR', { month: 'long' }).charAt(0).toUpperCase() +
        dataMesAnterior.toLocaleString('pt-BR', { month: 'long' }).slice(1);

      // eslint-disable-next-line no-unused-vars
      const mesAtual =
        dataAtual.toLocaleString('pt-BR', { month: 'long' }).charAt(0).toUpperCase() +
        dataAtual.toLocaleString('pt-BR', { month: 'long' }).slice(1);

      let localClienteNome = '';

      if (fechamento?.local?.localNome) {
        localClienteNome = `${fechamento?.local?.localNome}`;
      } else {
        localClienteNome = '';
      }

      // tenta obter o nome do arquivo a partir do header Content-Disposition (se fornecido)
      let filename = `${dataFormatada} Fechamento ${mesRef} ${fechamento.cliente?.clienteNome} ${localClienteNome}.pdf`;
      const disposition = res.headers.get('content-disposition');
      if (disposition) {
        const matchFilename = disposition.match(/filename\*=UTF-8''(.+)|filename="?([^"]+)"?/);
        if (matchFilename) {
          filename = decodeURIComponent(matchFilename[1] || matchFilename[2]);
        }
      }

      // cria URL temporária e força download / abre em nova aba
      const url = window.URL.createObjectURL(blob);

      // abrir em nova aba para visualização
      window.open(url, '_blank');

      // também forçar download (opcional)
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();

      // libera o objeto URL
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Erro ao buscar PDF:', error);
      toast.error('Erro ao baixar o PDF!');
    }
  }
  function handlePrintProductClick(fechamento) {
    if (!fechamento || !fechamento.fechamentoId) {
      console.error('Fechamento inválido');
      toast.error('Fechamento inválido!');
      return;
    }
    navigate(`/fechamento/produto/${fechamento.fechamentoId}`, { state: { fechamento } });
  }
  function handleDeleteClick(fechamento) {
    setFechamentosCarregados(false);
    setEdit(false);
    deleteFechamento(fechamento.fechamentoId);
  }
  function handleEditClick(fechamento) {
    setEdit(true);

    if (!fechamento.cliente) {
    }

    setForm({
      ...form,
      fechamentoId: fechamento.fechamentoId,
      cliente: fechamento?.cliente?.clienteId,
      local: fechamento?.local?.localId,
      fechamentoInicioTemp: fechamento.fechamentoInicio.split('T')[0],
      fechamentoFinalTemp: fechamento.fechamentoFinal.split('T')[0],
    });
    handleOpen();
  }
  function handleStatusChangeClick(fechamento) {
    console.log('123');
    setStatusForm({
      fechamentoId: fechamento.fechamentoId,
      fechamentoStatus: fechamento.fechamentoStatus,
    });
    handleStatusOpen();
  }

  return (
    <>
      <Table>
        <TableHead>
          <TableRow key={2}>
            <TableCell>
              <strong>Início</strong>
            </TableCell>
            <TableCell>
              <strong>Final</strong>
            </TableCell>
            <TableCell>
              <strong>Cliente</strong>
            </TableCell>
            <TableCell>
              <strong>Local</strong>
            </TableCell>
            <TableCell>
              <strong>Valor Serviços</strong>
            </TableCell>
            <TableCell>
              <strong>Valor Produtos</strong>
            </TableCell>
            <TableCell>
              <strong>Status</strong>
            </TableCell>
            <TableCell>
              <strong>Ações</strong>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {!fechamentosCarregados ? (
            <TableRow>
              <TableCell colSpan="8">Sem dados...</TableCell>
            </TableRow>
          ) : (
            fechamentos?.content?.map((fechamento) => (
              <TableRow key={fechamento.fechamentoId}>
                <TableCell>
                  {fechamento.fechamentoInicio
                    ? formatInTimeZone(
                        new Date(fechamento.fechamentoInicio + 'Z'), // Adiciona o 'Z' para indicar UTC
                        'America/Sao_Paulo',
                        'dd/MM/yyyy HH:mm:ss',
                      )
                    : 'Data Indisponível'}
                </TableCell>
                <TableCell>
                  {fechamento.fechamentoFinal
                    ? formatInTimeZone(
                        new Date(fechamento.fechamentoFinal + 'Z'), // Adiciona o 'Z' para indicar UTC
                        'America/Sao_Paulo',
                        'dd/MM/yyyy HH:mm:ss',
                      )
                    : 'Data Indisponível'}
                </TableCell>
                <TableCell>{fechamento.cliente?.clienteNome}</TableCell>
                <TableCell>{fechamento?.local?.localNome}</TableCell>
                <TableCell>
                  {fechamento.fechamentoValorServicos.toLocaleString('pt-br', {
                    style: 'currency',
                    currency: 'BRL',
                  })}
                </TableCell>
                <TableCell>
                  {fechamento.fechamentoValorProdutos.toLocaleString('pt-br', {
                    style: 'currency',
                    currency: 'BRL',
                  })}
                </TableCell>
                <TableCell>{fechamento.fechamentoStatus}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEditClick(fechamento)}>
                    <IconEdit color="#5d87ff" />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteClick(fechamento)}>
                    <IconTrash color="#5d87ff" />
                  </IconButton>
                  <IconButton onClick={() => handlePrintClick(fechamento)}>
                    <IconPrinter color="#2b9180ff" />
                  </IconButton>
                  <IconButton onClick={() => handlePrintAntigo(fechamento)}>
                    <IconPrinter color="#5d87ff" />
                  </IconButton>
                  <IconButton onClick={() => handlePrintProductClick(fechamento)}>
                    <IconShoppingCart color="#5d87ff" />
                  </IconButton>
                  <IconButton onClick={() => handleStatusChangeClick(fechamento)}>
                    <IconStatusChange color="#5d87ff" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 20, 200, { label: 'Todos', value: -1 }]}
              colSpan={6}
              count={fechamentos?.totalElements ? fechamentos?.totalElements : -1}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
      <ModalForm
        open={open}
        handleClose={handleClose}
        edit={edit}
        setEdit={setEdit}
        form={form}
        setForm={setForm}
        listaClientes={listaClientes}
        setFechamentosCarregados={setFechamentosCarregados}
      />
      <ModalStatusForm
        statusOpen={statusOpen}
        handleStatusClose={handleStatusClose}
        edit={edit}
        setEdit={setEdit}
        statusForm={statusForm}
        setStatusFrom={setStatusForm}
        setFechamentosCarregados={setFechamentosCarregados}
      />
    </>
  );
};

export default FechamentoTable;
