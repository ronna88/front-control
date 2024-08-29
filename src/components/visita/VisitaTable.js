import React, { useState, useEffect } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableRow,
} from '@mui/material';
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
import {IconEdit, IconTrash} from '@tabler/icons';
import Modal from '@mui/material/Modal';
import { Typography } from '@mui/material';
import VisitaForm from './VisitaForm';
// import { getVisitasData } from '../../api/Api';
import { getVisitasDataFiltro } from 'src/api/Api';


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
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
                >
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


const VisitaTable = ({rows, setRows, loading, setLoading, edit, setEdit,
    erase, setErase, listaClientes, setListaClientes, listaAtivos, listaFuncionarios,
    setListaAtivos, cliente, setCliente, filtro, setFiltro, page, setPage, rowsPerPage, setRowsPerPage, carregado, setCarregado}) => {
    const [selectedVisita, setSelectedVisita] = useState()
    
    const [sort, setSort] = useState("visitaDescricao")
    const [loadingKey, setLoadingKey] = useState(0);
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => {
        setOpen(false)
        setSelectedVisita()
    }
    const [form, setForm] = useState({
        visitaInicio: "",
        visitaFinal: "",
        visitaDescricao: "",
        visitaRemoto: false,
        visitaValorProdutos: 0.00,
        visitaTotalAbono: 0.00,
        funcionarios: [],
        cliente: '',
        local: '',
        visitaTotalHoras: 0.00,
      })

      useEffect(()=> {
        /*
        if(filtro.visitaInicio && filtro.visitaFinal && filtro.funcionario) {
            getVisitasDataFiltro(
                filtro,
                page,
                rowsPerPage,
                sort
                )
          .then((response) => {
              setRows(response.data);
          })
          .catch((error) => {
              console.log("Erro ao recuperar dados. " + error);
          });
        } */

          console.log('filtro!!!!!!!!!!!!!')
          console.log(filtro)
          console.log('page!!!!!!!!!!!!!')
          console.log(page)
        getVisitasDataFiltro(
                filtro,
                page,
                rowsPerPage
                )
          .then((response) => {
              setRows(response.data);
          })
          .catch((error) => {
              console.log("Erro ao recuperar dados. " + error);
          });
      }, [page])


      useEffect(()=>{
        if(filtro.funcionario !== '') {
            // atualização com filtro
            getVisitasDataFiltro(
                filtro,
                page,
                rowsPerPage
            )
            .then((response) => {
                setRows(response.data);
            })
            .catch((error) => {
                console.log("Erro ao recuperar dados. " + error);
            });
        } else {
            console.log('teste rowsPerPage')
            console.log(rowsPerPage)
            // atualização sem filtro
            getVisitasDataFiltro(
                filtro,
                page,
                rowsPerPage
            ) 
            .then((response) => {
                setRows(response.data);
            })
            .catch((error) => {
                console.log("Erro ao recuperar dados. " + error);
            });
        }
        
        },[rowsPerPage]) 
    
      /*

    useEffect(() => {
        if(rows.length === 0){
            getVisitasData(
                page,
                rowsPerPage,
                sort
                )
      .then((response) => {
          setRows(response.data);
      })
      .catch((error) => {
          console.log("Erro ao recuperar dados. " + error);
      });
        }
    if(loading){
        if(rows?.content?.length > 0) {
            setLoading(false);
        }
    } else {
        setLoadingKey(prevKey => prevKey + 1);
    }
}, [rows]); */

/*
    useEffect(()=>{
        getVisitasData(
            page,
            rowsPerPage,
            sort
            )
      .then((response) => {
          setRows(response.data);
      })
      .catch((error) => {
          console.log("Erro ao recuperar dados. " + error);
      });
        },[page]) */

        /*
    useEffect(()=>{
        getVisitasData(
            page,
            rowsPerPage,
            sort
            )
      .then((response) => {
          setRows(response.data);
      })
      .catch((error) => {
          console.log("Erro ao recuperar dados. " + error);
      });
        },[rowsPerPage]) */

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value));
        // setPage(0);
    };
    
    function handleEditClick(visita){
        console.log(visita)
        setSelectedVisita(visita)
        setEdit(true)
        setErase(false)
        var f = []
        for(let i =0 ; i < visita.funcionarios.length; i++){
            f.push(visita.funcionarios[i].funcionarioId)
        }
        setForm({
            visitaId: visita.visitaId,
            visitaInicio: visita.visitaInicio,
            visitaFinal: visita.visitaFinal,
            visitaDescricao: visita.visitaDescricao,
            visitaRemoto: visita.visitaRemoto,
            visitaValorProdutos: visita.visitaValorProdutos,
            visitaTotalAbono: visita.visitaTotalAbono,
            funcionarios: f,
            cliente: visita.cliente.clienteId,
            local: visita.local.localId,
        })
        handleOpen()
    }
    function handleDeleteClick(visita){
        setSelectedVisita(visita)
        setErase(true)
        setEdit(false)
        handleOpen()
    }
    
    const ativo={
        px: "4px",
        backgroundColor: '#5d87ff',
        color: "#fff"}
    const desativo={
        px: "4px",
        backgroundColor: '#FA896B',
        color: "#fff"
    }

    function getFuncionarios(visita){
        let nomeFuncionarios = '';
        for(let i=0; i<visita.funcionarios.length;i++) {
                       const result = listaFuncionarios.filter(func => (func.funcionarioId === visita.funcionarios[i].funcionarioId))
            
            for (let j = 0 ; j < result.length ; j ++) {
                nomeFuncionarios = nomeFuncionarios + ',' + result[j].funcionarioNome;
            }
            
        }

        return nomeFuncionarios;
    }

    return (
        <>
       
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell><strong>Inicio</strong></TableCell>
                    <TableCell><strong>Cliente</strong></TableCell>
                    <TableCell><strong>Local</strong></TableCell>
                    <TableCell><strong>Descrição</strong></TableCell>
                    <TableCell><strong>Remoto?</strong></TableCell>
                    <TableCell><strong>Funcionarios</strong></TableCell>
                    <TableCell><strong>Total Horas</strong></TableCell>
                    <TableCell><strong>Ações</strong></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {
                (loading ? (
                    <TableRow><TableCell colSpan='5'>Sem dados...</TableCell></TableRow>
                    ) :
                    (rows?.content)?.map((row) => (
                        <TableRow key={row.visitaId}>
                          
                            <TableCell>{new Date(row.visitaInicio).toLocaleString()}</TableCell>
                            <TableCell>{row.cliente.clienteNome}</TableCell>
                            <TableCell>{row.local.localNome}</TableCell>
                            <TableCell>{row.visitaDescricao}</TableCell>
                            <TableCell>{row.visitaRemoto ? 'Sim' : 'Não'}</TableCell>
                            <TableCell>{getFuncionarios(row)}</TableCell>
                            <TableCell>{row.visitaTotalHoras}</TableCell>
                            <TableCell><IconButton onClick={() => handleEditClick(row)}><IconEdit color="#5d87ff" /></IconButton>  <IconButton onClick={() => handleDeleteClick(row)}><IconTrash color="#5d87ff" /></IconButton></TableCell>
                        </TableRow>
                        ))
                      )
                }
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 20, 50, { label: 'Todos', value: rows.totalElements }]}
                        colSpan={7}
                        count={(rows?.totalElements ? rows?.totalElements : -1)}
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
            <Typography sx={{marginBottom: '2rem'}} id="modal-modal-title" variant="h3" component="h2">
                {edit ? 'Editar' : 'Apagar'} Visita
            </Typography>
            <VisitaForm handleClose={handleClose} edit={edit} setEdit={setEdit} erase={erase} setRows={setRows} setLoading={setLoading}
                listaClientes={listaClientes} listaFuncionarios={listaFuncionarios}
                setForm={setForm} form={form} carregado={carregado} setCarregado={setCarregado} />
            </Box>
        </Modal>
    </>
    )
}

export default VisitaTable;