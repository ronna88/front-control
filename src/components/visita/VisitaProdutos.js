import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  IconButton,
  Typography,
  Grid,
  Stack,
} from '@mui/material';
import { IconPlus, IconTrash } from '@tabler/icons';

const VisitaProdutos = ({ form, setForm }) => {
  const [produtos, setProdutos] = useState([]);
  const [totalGeral, setTotalGeral] = useState(0);

  console.log(totalGeral)

  useEffect(() => {
    setForm({ ...form, produtos });
  }, [produtos]);

  useEffect(() => {
    if (form.produtos) {
      setProdutos(form.produtos);
    }

    if (form.visitaValorProdutos) {
      setTotalGeral(parseFloat(form.visitaValorProdutos));
    }
  }, []);

  const adicionarProduto = () => {
    const novoProduto = {
      id: Date.now(), // ID único baseado no timestamp
      nome: '',
      quantidade: 1,
      preco: 0,
    };
    setProdutos([...produtos, novoProduto]);
  };

  const removerProduto = (id) => {
    setProdutos(produtos.filter((produto) => produto.id !== id));
  };

  const atualizarProduto = (id, campo, valor) => {
    setProdutos(
      produtos.map((produto) => (produto.id === id ? { ...produto, [campo]: valor } : produto)),
    );
  };

  const calcularTotal = (produto) => {
    return (produto.quantidade * produto.preco).toFixed(2);
  };

  const calcularTotalGeral = () => {
    const valorTotal = produtos.reduce(
      (total, produto) => total + produto.quantidade * produto.preco,
      0,
    );
    return valorTotal.toFixed(2);
  };

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6">Produtos da Visita</Typography>
        <Button variant="contained" startIcon={<IconPlus />} onClick={adicionarProduto}>
          Adicionar Produto
        </Button>
      </Stack>

      {produtos.length === 0 ? (
        <Card>
          <CardContent>
            <Typography variant="body2" color="text.secondary" align="center">
              Nenhum produto adicionado. Clique em "Adicionar Produto" para começar.
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <Box>
          {produtos.map((produto, index) => (
            <Card key={produto.id} sx={{ mb: 2 }}>
              <CardContent>
                <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                  <Typography variant="h6">Produto {index + 1}</Typography>
                  <IconButton color="error" onClick={() => removerProduto(produto.id)} size="small">
                    <IconTrash />
                  </IconButton>
                </Stack>

                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Nome do Produto"
                      value={produto.nome}
                      onChange={(e) => atualizarProduto(produto.id, 'nome', e.target.value)}
                      variant="outlined"
                    />
                  </Grid>

                  <Grid item xs={12} md={2}>
                    <TextField
                      fullWidth
                      label="Quantidade"
                      type="number"
                      value={produto.quantidade}
                      onChange={(e) =>
                        atualizarProduto(produto.id, 'quantidade', parseFloat(e.target.value) || 0)
                      }
                      variant="outlined"
                      inputProps={{ min: 0, step: 1 }}
                    />
                  </Grid>

                  <Grid item xs={12} md={2}>
                    <TextField
                      fullWidth
                      label="Preço Unitário"
                      type="number"
                      value={produto.preco}
                      onChange={(e) =>
                        atualizarProduto(produto.id, 'preco', parseFloat(e.target.value) || 0)
                      }
                      variant="outlined"
                      inputProps={{ min: 0, step: 0.01 }}
                    />
                  </Grid>

                  <Grid item xs={12} md={2}>
                    <TextField
                      fullWidth
                      label="Total"
                      value={`R$ ${calcularTotal(produto)}`}
                      variant="outlined"
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          ))}

          {produtos.length > 0 && (
            <Card sx={{ mt: 2, bgcolor: 'primary.light' }}>
              <CardContent>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography variant="h6">Total Geral:</Typography>
                  <Typography variant="h5" color="primary.main">
                    R$ {calcularTotalGeral()}
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          )}
        </Box>
      )}
    </Box>
  );
};

export default VisitaProdutos;
