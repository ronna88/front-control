
import axios from 'axios';

const urlBase = `http://${process.env.REACT_APP_BASE_URL}:7000`

export async function getEmpresaData(page, size, sort, direction){
  return await axios.get(`${urlBase}/empresa`, {params: {page,size,sort}});
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