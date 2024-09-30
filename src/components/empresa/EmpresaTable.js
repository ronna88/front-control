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
import { IconEdit, IconTrash } from '@tabler/icons';
import Modal from '@mui/material/Modal';
import { Typography } from '@mui/material';
import EmpresaForm from './EmpresaForm';

import { getEmpresaData } from '../../api/Api';

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

const EmpresaTable = ({ rows, setRows, loading, setLoading, edit, setEdit, erase, setErase }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sort, setSort] = useState('empresaNomeFantasia');
  const [loadingKey, setLoadingKey] = useState(0);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [selectedEmpresa, setSelectedEmpresa] = useState();

  useEffect(() => {
    if (rows.length === 0) {
      getEmpresaData(page, rowsPerPage, sort)
        .then((response) => {
          console.log(response);
          setRows(response.data);
        })
        .catch((error) => {
          console.log('Erro ao recuperar dados. ' + error);
        });
    }
    if (loading) {
      if (rows?.content?.length > 0) {
        setLoading(false);
      }
    } else {
      setLoadingKey((prevKey) => prevKey + 1);
    }
  }, [rows]);

  useEffect(() => {
    getEmpresaData(page, rowsPerPage, sort)
      .then((response) => {
        setRows(response.data);
      })
      .catch((error) => {
        console.log('Erro ao recuperar dados. ' + error);
      });
  }, [page]);

  useEffect(() => {
    getEmpresaData(page, rowsPerPage, sort)
      .then((response) => {
        setRows(response.data);
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

  function handleEditClick(empresa) {
    setSelectedEmpresa(empresa);
    setEdit(true);
    setErase(false);
    handleOpen();
  }
  function handleDeleteClick(empresa) {
    setSelectedEmpresa(empresa);
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

  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <strong>Nome Fantasia</strong>
            </TableCell>
            <TableCell>
              <strong>CNPJ</strong>
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
              <TableCell colspan="4">Sem dados...</TableCell>
            </TableRow>
          ) : (
            (rows?.content).map((row) => (
              <TableRow key={row.empresaId}>
                <TableCell>{row.empresaNomeFantasia}</TableCell>
                <TableCell>{row.empresaCNPJ}</TableCell>
                <TableCell>
                  <Chip
                    label={row.empresaStatus}
                    sx={row.empresaStatus === 'ATIVO' ? ativo : desativo}
                    variant="outlined"
                  />
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEditClick(row)}>
                    <IconEdit color="#5d87ff" />
                  </IconButton>{' '}
                  <IconButton onClick={() => handleDeleteClick(row)}>
                    <IconTrash color="#5d87ff" />
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
            {edit ? 'Editar' : 'Apagar'} empresa
          </Typography>
          <EmpresaForm
            handleOpen={handleOpen}
            handleClose={handleClose}
            setRows={setRows}
            setLoading={setLoading}
            edit={edit}
            setEdit={setEdit}
            erase={erase}
            selectedEmpresa={selectedEmpresa}
            setSelectedEmpresa={setSelectedEmpresa}
          />
        </Box>
      </Modal>
    </>
  );
};

export default EmpresaTable;
