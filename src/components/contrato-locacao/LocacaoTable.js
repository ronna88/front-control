import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableFooter, TableHead, TableRow } from '@mui/material';
import Chip from '@mui/material/Chip';
import TablePagination from '@mui/material/TablePagination';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import { IconEdit, IconTrash, IconStatusChange } from '@tabler/icons';
import Modal from '@mui/material/Modal';
import { Typography } from '@mui/material';
import AtivoForm from './LocacaoForm';
import AtivoStatusForm from './AtivoStatusForm';
import { getLocacaoData } from '../../api/Api';

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

const LocacaoTable = ({ rows, setRows, loading, setLoading, edit, setEdit, erase, setErase }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const [sort, setSort] = useState('');
  const [loadingKey, setLoadingKey] = useState(0);
  const [open, setOpen] = useState(false);
  const [statusChange, setStatusChange] = useState(false);
  const handleStatusChange = () => setStatusChange(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleCloseStatus = () => setStatusChange(false);
  const [selectedLocacao, setSelectedLocacao] = useState();

  const contratoEmBranco = {
    descricao: 'Sem dados',
    valorMensal: 0,
    status: 'ATIVO',
    ativosLocados: [],
  };

  useEffect(() => {
    if (rows.length === 0) {
      getLocacaoData()
        .then((response) => {
          if (response.data === 'Nenhum contrato encontrado!') {
            setRows([contratoEmBranco]);
          } else {
            setRows([]);
            setRows(response.data);
          }
        })
        .catch((error) => {
          console.log('Erro ao recuperar dados. ' + error);
        });
    }
    if (loading) {
      console.log('Loading...');
      console.log('rows', rows);
      if (rows?.length > 0) {
        setLoading(false);
      }
    } else {
      setLoadingKey((prevKey) => prevKey + 1);
    }
  }, [rows]);

  useEffect(() => {
    getLocacaoData()
      .then((response) => {
        if (response.data === 'Nenhum contrato encontrado!') {
          setRows([contratoEmBranco]);
        } else {
          setRows([]);
          setRows(response.data);
        }
      })
      .catch((error) => {
        console.log('Erro ao recuperar dados. ' + error);
      });
  }, [page]);

  useEffect(() => {
    getLocacaoData()
      .then((response) => {
        if (response.data === 'Nenhum contrato encontrado!') {
          setRows([contratoEmBranco]);
        } else {
          setRows([]);
          setRows(response.data);
        }
      })
      .catch((error) => {
        console.log('Erro ao recuperar dados. ' + error);
      });
  }, [rowsPerPage]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value));
    setPage(0);
  };

  function handleEditClick(ativo) {
    setSelectedLocacao(ativo);
    setEdit(true);
    setErase(false);
    handleOpen();
  }
  function handleStatusChangeClick(ativo) {
    setSelectedLocacao(ativo);
    setEdit(true);
    setErase(false);
    handleStatusChange();
  }
  function handleDeleteClick(ativo) {
    setSelectedLocacao(ativo);
    setErase(true);
    setEdit(false);
    handleOpen();
  }

  const ativo = {
    px: '4px',
    backgroundColor: '#5d87ff',
    color: '#fff',
  };
  const desativo = {
    px: '4px',
    backgroundColor: '#FA896B',
    color: '#fff',
  };

  function valorTotal(ativosLocados) {
    let valorTotalMensal = 0;
    console.log('ativosLocados', ativosLocados);
    ativosLocados.forEach((ativo) => {
      valorTotalMensal += ativo.valorMensal;
    });
    return valorTotalMensal;
  }

  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <strong>Descrição</strong>
            </TableCell>
            <TableCell>
              <strong>Valor de Locação</strong>
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
          {loading ? (
            <TableRow>
              <TableCell colSpan="4">Sem dados...</TableCell>
            </TableRow>
          ) : (
            rows?.map((row) => (
              <TableRow key={row.contratoLocacaoId}>
                <TableCell>{row.descricao}</TableCell>
                <TableCell>{valorTotal(row.ativosLocados)}</TableCell>
                <TableCell>
                  <Chip
                    label={row.status}
                    sx={row.status === 'ATIVO' ? ativo : desativo}
                    variant="outlined"
                  />
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEditClick(row)}>
                    <IconEdit color="#5d87ff" />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteClick(row)}>
                    <IconTrash color="#5d87ff" />
                  </IconButton>
                  <IconButton onClick={() => handleStatusChangeClick(row)}>
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
              rowsPerPageOptions={[5, 10, 20, { label: 'All', value: -1 }]}
              colSpan={4}
              count={rows.totalElements ? rows.totalElements : -1}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            sx={{ marginBottom: '2rem' }}
            id="modal-modal-title"
            variant="h3"
            component="h2"
          >
            {edit ? 'Editar' : 'Apagar'} ativo
          </Typography>
          <AtivoForm
            handleOpen={handleOpen}
            handleClose={handleClose}
            setRows={setRows}
            setLoading={setLoading}
            edit={edit}
            setEdit={setEdit}
            erase={erase}
            setErase={setErase}
            selectedAtivo={selectedLocacao}
            setSelectedAtivo={setSelectedLocacao}
          />
        </Box>
      </Modal>

      <Modal
        open={statusChange}
        onClose={handleCloseStatus}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            sx={{ marginBottom: '2rem' }}
            id="modal-modal-title"
            variant="h3"
            component="h2"
          >
            Selecione o novo status do ativo: {selectedLocacao?.ativoDescricao}
          </Typography>
          <AtivoStatusForm
            handleOpen={handleStatusChange}
            handleClose={handleCloseStatus}
            setRows={setRows}
            setLoading={setLoading}
            edit={edit}
            setEdit={setEdit}
            erase={erase}
            setErase={setErase}
            selectedAtivo={selectedLocacao}
            setSelectedAtivo={setSelectedLocacao}
          />
        </Box>
      </Modal>
    </>
  );
};

export default LocacaoTable;
