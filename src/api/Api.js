import axios from 'axios';

const urlBase = `https://${process.env.REACT_APP_URL}`;
// const urlBase = `http://localhost:7000`;

// ================ EMPRESA API
export async function getEmpresaData(page, size, sort, direction) {
  if (!page && !size && !sort && !direction) {
    return await axios.get(`${urlBase}/empresa`);
  } else {
    return await axios.get(`${urlBase}/empresa`, { params: { page, size, sort } });
  }
}

export async function saveEmpresaData(form) {
  if (form.empresaId) {
    return await axios.put(`${urlBase}/empresa/${form.empresaId}`, form);
  } else {
    return await axios.post(`${urlBase}/empresa/novo`, form);
  }
}

export async function deleteEmpresa(empresa) {
  return await axios.delete(`${urlBase}/empresa/${empresa.empresaId}`);
}
// ================ EMPRESA API

// ================ CLIENTE PF API
export async function getPFData(page, size, sort, direction) {
  return await axios.get(`${urlBase}/cliente/pf`, { params: { page, size, sort } });
}

export async function savePFData(form) {
  if (form.clienteId) {
    return await axios.put(`${urlBase}/cliente/pf/${form.clienteId}`, form);
  } else {
    return await axios.post(`${urlBase}/cliente/pf/novo`, form);
  }
}

export async function deletePF(pf) {
  return await axios.delete(`${urlBase}/cliente/pf/${pf.clienteId}`);
}
// ================ CLIENTE PF API

// ================ CLIENTE PJ API
export async function getPJData(page, size, sort, direction) {
  return await axios.get(`${urlBase}/cliente/pj`, { params: { page, size, sort } });
}

export async function savePJData(form) {
  if (form.clienteId) {
    console.log('cliente PJ att: ');
    console.log(form);
    return await axios.put(`${urlBase}/cliente/pj/${form.clienteId}`, form);
  } else {
    return await axios.post(`${urlBase}/cliente/pj/novo`, form);
  }
}

export async function deletePJ(pf) {
  return await axios.delete(`${urlBase}/cliente/pj/${pf.clienteId}`);
}
// ================ CLIENTE PJ API

// ================ CLIENTE API
export async function getClienteData(page, size, sort, direction) {
  return await axios.get(`${urlBase}/cliente`, { params: { page, size, sort } });
}
// ================ CLIENTE API

// ================ LOCAIS API
export async function getLocaisData(clienteId, page, size, sort, direction) {
  console.log(clienteId);
  return await axios.get(`${urlBase}/local/${clienteId}`, { params: { page, size, sort } });
}

export async function saveLocalData(clienteId, form) {
  if (form.localId) {
    return await axios.put(`${urlBase}/local/${clienteId}/${form.localId}`, form);
  } else {
    return await axios.post(`${urlBase}/local/${clienteId}`, form);
  }
}

export async function deleteLocal(clienteId, localId) {
  return await axios.delete(`${urlBase}/local/${clienteId}/${localId}`);
}
// ================ LOCAIS API

// ================ ATIVOS API
export async function getAtivoData(page, size, sort, direction) {
  return await axios.get(`${urlBase}/ativo`, { params: { page, size, sort } });
}

export async function getAtivosDisponiveis() {
  return await axios.get(`${urlBase}/ativo/disponiveis`);
}

export async function saveAtivoData(form) {
  // console.log(form)
  if (form.ativoId) {
    return await axios.put(`${urlBase}/ativo/${form.ativoId}`, form);
  } else {
    return await axios.post(`${urlBase}/ativo/novo`, form);
  }
}

export async function saveAtivoStatusData(form) {
  console.log(form);
  if (form.ativoId) {
    return await axios.put(`${urlBase}/ativo/${form.ativoId}/status`, form);
  }
}

export async function deleteAtivo(ativoId) {
  return await axios.delete(`${urlBase}/ativo/${ativoId}`);
}
// ================ ATIVOS API

// ================ CONTRATOS API
export async function getContratoData(page, size, sort, direction) {
  return await axios.get(`${urlBase}/contrato`, { params: { page, size, sort } });
}

export async function saveContratoData(form) {
  if (form.contratoId) {
    console.log('Editar contrato');
    console.log(form);
    return await axios.put(`${urlBase}/contrato/${form.contratoId}`, form);
  } else {
    console.log(form);
    return await axios.post(`${urlBase}/contrato/novo`, form);
  }
}

export async function deleteContrato(contratoId) {
  return await axios.delete(`${urlBase}/contrato/${contratoId}`);
}
// ================ CONTRATOS API

// ================ FUNCIONARIOS API
export async function getFuncionarioData(page, size, sort, direction) {
  if (!page && !size && !sort && !direction) {
    return await axios.get(`${urlBase}/funcionario/ativos`);
  } else {
    return await axios.get(`${urlBase}/funcionario/ativos`, { params: { page, size, sort } });
  }
}

export async function saveFuncionarioData(form) {
  if (form.funcionarioId) {
    return await axios.put(`${urlBase}/funcionario/${form.funcionarioId}`, form);
  } else {
    return await axios.post(`${urlBase}/funcionario/novo`, form);
  }
}

export async function deleteFuncionario(funcionario) {
  return await axios.delete(`${urlBase}/funcionario/${funcionario.funcionarioId}`);
}
// ================ FUNCIONARIOS API

// ================ VISITAS API
/*
export async function getVisitasData(page, size, sort, direction){
  if(!page && !size && !sort && !direction) {
    console.log('teste 0001')
    return await axios.get(`${urlBase}/visita` , {params: {page:0,size:5,sort:null}});
  } else {
    console.log('teste 0002')
    console.log(page)
    console.log(size)
    console.log(sort)
    return await axios.get(`${urlBase}/visita`, {params: {page,size,sort}});
  }
} */

export async function getAnaliseVisitas(periodo) {
  return await axios.post(`${urlBase}/visita/analise`, periodo);
}

export async function getContagemVisitas(periodo) {
  return await axios.post(`${urlBase}/visita/contagem`, periodo);
}

export async function saveVisitaData(form) {
  if (form.visitaValorProdutos === '') {
    form.visitaValorProdutos = 0.0;
  }
  if (form.visitaTotalAbono === '') {
    form.visitaTotalAbono = 0.0;
  }

  if (form.produtos && form.produtos.length > 0) {
  // Ajustar valorTotal dos produtos no campo já existente - somente se o array de produtos existir
  const valorTotalProdutos = form.produtos.reduce(
    (total, produto) => total + produto.quantidade * produto.preco,
    0,
  );
  form.visitaValorProdutos = parseFloat(valorTotalProdutos.toFixed(2));
  }
  

  if (form.visitaId) {
    console.log('Editar Visita');
    console.log(form);
    return await axios.put(`${urlBase}/visita/${form.visitaId}`, form);
  } else {
    console.log('Nova Visita');
    console.log(form);
    return await axios.post(`${urlBase}/visita/novo`, form);
  }
}

export async function deleteVisita(visita) {
  console.log('deletando visita: ' + visita.visitaId);
  return await axios.delete(`${urlBase}/visita/delete/${visita.visitaId}`);
}

// TODO: MUdar de busca somente pelo funcionario para o conjunto
export async function getVisitasDataFiltro(filtro, page, size) {
  // console.log(filtro)

  if (filtro.visitaInicio !== '') {
    if (filtro.visitaInicio.includes('T')) {
    } else {
      filtro.visitaInicio = filtro.visitaInicio + 'T00:00:00';
    }
  } else {
    let data = new Date();
    data.setDate(1);
    filtro.visitaInicio = data.toISOString().split('T')[0] + 'T00:00:00';
  }
  if (filtro.visitaFinal !== '') {
    if (filtro.visitaFinal.includes('T')) {
    } else {
      filtro.visitaFinal = filtro.visitaFinal + 'T23:59:00';
    }
  } else {
    let data = new Date();
    filtro.visitaFinal = data.toISOString().split('T')[0] + 'T23:59:00';
  }
  console.log('Impressao de dados para debug.......');
  console.log(filtro);
  console.log(page);
  console.log(size);
  return await axios.post(`${urlBase}/visita/filtro`, filtro, { params: { page, size } });
}

export async function getVisitasValor() {
  return await axios.get(`${urlBase}/visita/visitascomvalor`);
}

export async function getVisitasPorMes(mes, ano) {
  // console.log(filtro)
  const inicioMes = new Date(ano, mes - 1, 1).toISOString().split('T')[0] + 'T00:00:00';
  const fimMes = new Date(ano, mes, 0).toISOString().split('T')[0] + 'T23:59:00';
  const page = 0;
  const size = 600;

  const filtro = {
    visitaInicio: inicioMes,
    visitaFinal: fimMes,
  };

  console.log('Impressao de dados para debug.......');
  console.log(filtro);
  console.log(page);
  console.log(size);
  return await axios.post(`${urlBase}/visita/filtro`, filtro, { params: { page, size } });
}
// ================ FUNCIONARIOS API

// ================ FECHAMENTOS API
export async function getFechamentos(page, size, sort, direction) {
  console.log('getFechamentos');
  const sortParam = `${sort},${direction}`;
  return await axios.get(`${urlBase}/fechamento`, {
    params: { page, size, sortParam },
  });
}

export async function getFechamentoFiltro(params) {
  console.log(params);
  let temp = {};
  if (params.cliente) {
    temp = { ...temp, cliente: params.cliente };
  }
  if (params.cliente === -1) {
    temp = { ...temp, cliente: '' };
  }
  if (params.fechamentoInicio) {
    temp = { ...temp, inicio: params.fechamentoInicio + 'T00:00:00' };
  }
  if (params.fechamentoFinal) {
    temp = { ...temp, fim: params.fechamentoFinal + 'T23:59:00' };
  }
  return await axios.post(`${urlBase}/fechamento/filtro`, temp);
}

export async function getFechamentoById(fechamentoId) {
  return await axios.get(`${urlBase}/fechamento/${fechamentoId}`);
}

export async function saveFechamento(form, edit) {
  console.log(form);

  if (edit) {
    if (form.fechamentoFinalTemp) {
      form.fechamentoFinal = form.fechamentoFinalTemp + 'T23:59:00';
    }
    if (form.fechamentoInicioTemp) {
      form.fechamentoInicio = form.fechamentoInicioTemp + 'T00:00:00';
    }
    return await axios.put(`${urlBase}/fechamento/editar/${form.fechamentoId}`, form);
  } else {
    return await axios.post(`${urlBase}/fechamento/new`, form);
  }

  /*if (form.fechamentoFinal === '') {
    form.fechamentoFinal = form.fechamentoFinalTemp+'T23:59:00'
  }
  if (form.fechamentoInicio === '') {
    form.fechamentoInicio = form.fechamentoInicioTemp+'T00:00:00'
  }
  if(form.fechamentoId) {
    console.log(form)
    return await axios.put(`${urlBase}/fechamento/editar/${form.fechamentoId}`, form)
  } else {
    return await axios.post(`${urlBase}/fechamento/novo`, form);
  }
    */
}

export async function editStatusFechamento(form, id) {
  return await axios.put(`${urlBase}/fechamento/editarStatus/${id}`, form);
}

export async function deleteFechamento(fechamentoId) {
  return await axios.delete(`${urlBase}/fechamento/apagar/${fechamentoId}`);
}

// ================ FECHAMENTOS API

// ================ LOCAÇÃO API
export async function getLocacaoData() {
  return await axios.get(`${urlBase}/contrato-locacao`);
}

export async function saveLocacaoData(form) {
  // console.log(form)
  if (form.contratoLocacaoId) {
    return await axios.put(`${urlBase}/contrato-locacao/${form.contratoLocacaoId}`, form);
  } else {
    return await axios.post(`${urlBase}/contrato-locacao/novo`, form);
  }
}

export async function saveLocacaoStatusData(form) {
  console.log(form);
  if (form.contratoLocacaoId) {
    return await axios.put(`${urlBase}/contrato-locacao/${form.contratoLocacaoId}/status`, form);
  }
}

export async function deleteLocacao(contratoLocacaoId) {
  return await axios.delete(`${urlBase}/contrato-locacao/${contratoLocacaoId}`);
}
// ================   LOCAÇÃO API
