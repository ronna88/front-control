
import axios from 'axios';

const urlBase = `http://${process.env.REACT_APP_BASE_URL}:7000`


// ================ EMPRESA API
export async function getEmpresaData(page, size, sort, direction){
  if(!page && !size && !sort && !direction) {
    return await axios.get(`${urlBase}/empresa`);
  } else {
    return await axios.get(`${urlBase}/empresa`, {params: {page,size,sort}});
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
export async function getPFData(page, size, sort, direction){
  return await axios.get(`${urlBase}/cliente/pf`, {params: {page,size,sort}});
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
export async function getPJData(page, size, sort, direction){
  return await axios.get(`${urlBase}/cliente/pj`, {params: {page,size,sort}});
}

export async function savePJData(form) {
  if (form.clienteId) {
    console.log('cliente PJ att: ')
    console.log(form)
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
  return await axios.get(`${urlBase}/cliente`, {params: {page,size,sort}});
}
// ================ CLIENTE API



// ================ LOCAIS API
export async function getLocaisData(clienteId, page, size, sort, direction){
  console.log(clienteId);
  return await axios.get(`${urlBase}/local/${clienteId}`, {params: {page,size,sort}});
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
export async function getAtivoData(page, size, sort, direction){
  return await axios.get(`${urlBase}/ativo`, {params: {page,size,sort}});
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
  console.log(form)
  if (form.ativoId) {
    return await axios.put(`${urlBase}/ativo/${form.ativoId}/status`, form);
  }
}

export async function deleteAtivo(ativoId) {
  return await axios.delete(`${urlBase}/ativo/${ativoId}`);
}
// ================ ATIVOS API



// ================ CONTRATOS API
export async function getContratoData(page, size, sort, direction){
  return await axios.get(`${urlBase}/contrato`, {params: {page,size,sort}});
}

export async function saveContratoData(form) {
  if (form.contratoId) {
    console.log('Editar contrato')
    console.log(form)
    return await axios.put(`${urlBase}/contrato/${form.contratoId}`, form);
  } else {
    console.log(form)
    return await axios.post(`${urlBase}/contrato/novo`, form);
  }
}

export async function deleteContrato(contratoId) {
  return await axios.delete(`${urlBase}/contrato/${contratoId}`);
}
// ================ CONTRATOS API



// ================ FUNCIONARIOS API
export async function getFuncionarioData(page, size, sort, direction){
  if(!page && !size && !sort && !direction) {
    return await axios.get(`${urlBase}/funcionario`);
  } else {
    return await axios.get(`${urlBase}/funcionario`, {params: {page,size,sort}});
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
export async function getVisitasData(page, size, sort, direction){
  if(!page && !size && !sort && !direction) {
    return await axios.get(`${urlBase}/visita`);
  } else {
    return await axios.get(`${urlBase}/visita`, {params: {page,size,sort}});
  }
}

export async function saveVisitaData(form) {
  if (form.visitaId) {
    return await axios.put(`${urlBase}/visita/${form.visitaId}`, form);
  } else {
    return await axios.post(`${urlBase}/visita/novo`, form);
  }
}

export async function deleteVisita(funcionario) {
  return await axios.delete(`${urlBase}/visita/${funcionario.funcionarioId}`);
}
// ================ FUNCIONARIOS API