
import axios from 'axios';

export async function getEmpresaData(page, size, sort, direction){
  const query = {
    page,
    size,
    sort,
  }
  return await axios.get('http://localhost:7000/empresa', {params: query});
}

export async function saveEmpresaData(form) {
  console.log(form)
  const body = {
    "empresaNomeFantasia": form.empresaNomeFantasia,
    "empresaCNPJ": form.empresaCNPJ,
    "empresaInscricaoEstadual": form.empresaInscricaoEstadual,
    "empresaEndereco": form.empresaEndereco,
    "empresaEmail": form.empresaEmail,
    "empresaTelefone": form.empresaTelefone};
  const url = 'http://localhost:7000/empresa/novo';
  return await axios.post(url, form);
}