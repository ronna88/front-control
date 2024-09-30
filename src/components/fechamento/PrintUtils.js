

const PrintUtils = (fechamento) => {

    if (!fechamento) {
        console.error('Fechamento object is undefined');
        return '<html><body><h1>Dados não disponíveis</h1></body></html>';
    }


    // Verifique se a lista de visitas está presente e não está vazia
    const visitasHTML = fechamento.visitas && fechamento.visitas.length > 0
        ? fechamento.visitas.map(visita => `
            <tr key="${visita.visitaId}">
                <td>${new Date(visita.visitaInicio).toLocaleString()}</td>
                <td>${new Date(visita.visitaFinal).toLocaleString()}</td>
                <td>${visita.visitaDescricao}</td>
                <td>${visita.visitaRemoto ? '0,0' : ((visita.visitaTotalHoras - visita.visitaTotalAbono).toFixed(2)).replace(".", ",")}</td>
            </tr>
        `).join('')
        : '<tr><td colspan="4">Nenhuma visita disponível</td></tr>';  // Mensagem se não houver visitas


return `
        <html>
        <head>
            <title>Print</title>
            <link rel="stylesheet" type="text/css" href="printStyles.css">
        </head>
        <body>
            <div class="container">
                <h1>Fechamento Details</h1>
                <table>
                    <thead>
                        <tr>
                            <td>Início</td><td>Término</td><td>Serviços</td><td>Horas</td>
                        </tr>
                    </thead>
                    <tbody>
                        ${visitasHTML}
                        <tr>
                            <td class='valorTotal' colspan=4>${fechamento.fechamentoValorServicos.toLocaleString('pt-br',{style:'currency', currency: 'BRL'})}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </body>
        </html>
    `;
}
export default PrintUtils;