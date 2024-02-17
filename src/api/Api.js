
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