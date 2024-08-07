import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import BlankCard from '../../components/shared/BlankCard';
import Button from '@mui/material/Button';
import { saveVisitaData, deleteVisita, getLocaisData } from '../../api/Api';
import { useNavigate } from 'react-router-dom';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Typography } from '@mui/material';
import { toast } from 'react-toastify';
import ClienteSelect from '../../components/cliente/ClienteSelect';
import LocalSelect from '../../components/cliente/LocalSelect';
import FuncionarioSelect from '../../components/funcionario/FuncionarioSelect';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import el from 'date-fns/locale/pt-BR';
import './styles.css';
registerLocale('pt-br', el);

const VisitaForm = ({ handleClose, edit, erase, setEdit, setRows, setLoading,
  listaClientes, listaFuncionarios,
  setForm, form }) => {

  const navigate = useNavigate()
  const [date, setDate] = useState(new Date())
  const [finalDate, setFinalDate] = useState(new Date())
  const [listaLocais, setListaLocais] = useState()
  const [funcionariosSelecionados, setFuncionariosSelecionados] = useState([])
  const [carregado, setCarregado] = useState(false)

  const style = {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    alignItems: 'center',
    justifyItems: 'center',
    width: '100%',
    paddingTop: '20px',
  };
  // TODO: ajustado o backend para verificar dados unicos
  const handleSave = () => {
    console.log(form)
    saveVisitaData(form)
      .then((response) => {
        setRows([]);
        setLoading(true);
        // TODO: Verificar setEdit nesta linha
        //setEdit(false)
        // setErase(false)
        //setListaLocais();
        //setForm();
        handleClose();
        toast.success('Visita salva com sucesso!');
      })
      .catch((error) => {
        console.log(error);
        if (error.response.data.message) {
          toast.error(`${error.response.data.message}`);
        } else {
          toast.error(`${error.response.data}`);
        }

      });

  };

  const handleOnChangeVisitainicio = (event) => {
    setForm({ ...form, visitaInicio: event.target.value });
  };
  const handleOnChangeVisitaFinal = (event) => {
    setForm({ ...form, visitaFinal: event.target.value });
  };

  const handleOnChangeDescricao = (event) => {
    setForm({ ...form, visitaDescricao: event.target.value });
  };

  const handleOnChangeVisitaRemoto = (event) => {
    setForm({ ...form, visitaRemoto: event.target.value });
  };

  const handleOnChangeValorProduto = (event) => {
    setForm({ ...form, visitaValorProdutos: parseFloat(event.target.value) });
  };

  const handleOnChangeTotalAbono = (event) => {
    setForm({ ...form, visitaTotalAbono: parseFloat(event.target.value) });
  };

  const handleSim = (visita) => {
    deleteVisita(visita.contratoId)
      .then((response) => {
        setRows([]);
        setLoading(true);
        handleClose();
        setListaLocais();
        toast.success('Visita apagado com sucesso!');
      })
      .catch((error) => {
        console.log(error);
        toast.error(`${error.message}`);
      });
  };

  const handleNao = () => {
    setRows([]);
    setLoading(true);
    setForm();
    handleClose();
  };

  useEffect(() => {
    //Ajusta no form as datas inicio e final
    setForm({ ...form, visitaInicio: date, visitaFinal: finalDate })
  }, [date, finalDate])



  useEffect(() => {
    if (form.cliente != '-1' && form.cliente != '') {
      getLocaisData(form.cliente)
        .then((response) => {
          console.log(response.data.content)
          setListaLocais(response.data.content);
        })
        .catch((error) => {
          console.log('Error: ' + error);
        })
    }
  }, [form.cliente])


  useEffect(() => {
    if (edit) {
      console.log('editar sim!')
      console.log(edit)
      setDate(form.visitaInicio)
      setFinalDate(form.visitaFinal)
    }

  }, [])



  return (
    <BlankCard>
      <Box sx={style}>
        {erase ? (
          <>
            <Typography variant="h3" component="h3" sx={{ marginBottom: '10px' }}>
              Deseja realmente apagar o contrato ?
            </Typography>
            <Box sx={{ display: 'flex', gap: 5 }}>
              <Button variant="contained" color="error" onClick={() => handleSim(form)}>
                Sim
              </Button>
              <Button variant="contained" onClick={() => handleNao()}>
                Não
              </Button>
            </Box>
          </>
        ) : (
          <>
            <div className="formContainer">
              <div className="col-1">
                {/*
                <InputLabel id='visitaValorProdutosLabel' sx={{ paddingLeft: '10px', zIndex: '1' }}>Início</InputLabel>
                <div className="datePicker">
                  <DatePicker
                    showTimeInput
                    placeholderText="Início"
                    timeInputLabel="Hora:"
                    timeFormat="p"
                    timeIntervals={15}
                    dateFormat="Pp"
                    minTime={new Date(0, 0, 0, 0, 0)}
                    maxTime={new Date(0, 0, 0, 23, 59)}
                    selected={date}
                    onChange={(date) => setDate(date)}
                    locale="pt-br"

                  />
                </div>
                */
                }
                <TextField type='datetime-local' value={form.visitaInicio} onChange={(event) => handleOnChangeVisitainicio(event)} />

                <TextField type='datetime-local' value={form.visitaFinal} onChange={(event) => handleOnChangeVisitaFinal(event)} />

                {/*
                <InputLabel id='visitaValorProdutosLabel' sx={{ paddingLeft: '10px', zIndex: '1' }}>Final</InputLabel>
                <div className="datePicker">
                  <DatePicker
                    showTimeInput
                    placeholderText="Final"
                    timeInputLabel="Hora:"
                    timeFormat="p"
                    timeIntervals={15}
                    dateFormat="Pp"
                    minTime={new Date(0, 0, 0, 0, 0)}
                    maxTime={new Date(0, 0, 0, 23, 59)}
                    selected={finalDate}
                    onChange={(finalDate) => setFinalDate(finalDate)}
                    locale="pt-br"
                  />
                </div>
                */}

                <ClienteSelect
                  listaClientes={listaClientes}
                  setListaLocais={setListaLocais}
                  setForm={setForm}
                  form={form}
                />

                {(form.cliente != '' && form.cliente != '-1') && listaLocais?.length > 0 ? (
                  <LocalSelect form={form} setForm={setForm} />
                ) : ''}

                <FormControlLabel control={
                  <Checkbox
                    value={form.visitaRemoto}
                    onChange={handleOnChangeVisitaRemoto}
                    sx={{ marginLeft: '10px' }}
                    id="visitaRemoto"
                    name="visitaRemoto"
                    placeholder="Visita Remota"
                  />
                } label="Visita Remota"
                />

                <InputLabel id='visitaValorProdutosLabel' sx={{ paddingLeft: '10px', zIndex: '1' }}>Valor dos Produtos</InputLabel>
                <FormControl>
                  <TextField
                    value={form.visitaValorProdutos}
                    onChange={handleOnChangeValorProduto}
                    sx={{ width: '300px', marginLeft: '10px' }}
                    id="visitaValorProdutos"
                    name="visitaValorProdutos"
                    placeholder="Valor dos Produtos"
                    type='number'
                    inputProps={{
                      step: 0.01,
                    }}
                  />
                </FormControl>

                <InputLabel id='visitaTotalAbonoLabel' sx={{ paddingLeft: '10px', zIndex: '1' }}>Total do Abono</InputLabel>
                <FormControl>
                  <TextField
                    value={form.visitaTotalAbono}
                    onChange={handleOnChangeTotalAbono}
                    sx={{ width: '300px', marginLeft: '10px' }}
                    id="visitaTotalAbono"
                    name="visitaTotalAbono"
                    placeholder="Total Abonado"
                    type='number'
                    inputProps={{
                      step: 0.01,
                    }}
                  />
                </FormControl>

                <FuncionarioSelect
                  listaFuncionarios={listaFuncionarios}
                  form={form}
                  setForm={setForm} funcionariosSelecionados={funcionariosSelecionados} setFuncionariosSelecionados={setFuncionariosSelecionados}
                />
              </div>

              <div className="colForm">
                <InputLabel id='visitaValorProdutosLabel' sx={{ paddingLeft: '10px', zIndex: '1' }}>Descrição</InputLabel>
                <TextField
                  multiline
                  rows={11}
                  value={form.visitaDescricao}
                  onChange={handleOnChangeDescricao}
                  sx={{ width: '300px' }}
                  id="visitaDescricao"
                  name="visitaDescricao"
                  placeholder="Descrição"
                />
              </div>
            </div>
            <Button sx={{ margin: '20px' }} variant="contained" onClick={handleSave}>
              {edit ? 'Atualizar' : 'Salvar'}
            </Button>
          </>
        )}
      </Box>
    </BlankCard>
  );
};

export default VisitaForm;
