async function ViewDocumentsC(data){
    const url = "http://172.16.19.96/open/apis/default/api/ExportService";
    // const url = window.AppbaseUrl + '/api/ParseDocument/ParseDocument';
    // const head = { accept : '*/*'};
    let data1 = data == null ? [] : data;
    const response = await fetch(url, {
        method:'POST',
        // headers: head,
        body:data
    })
    .then((res) => res.text())
    .then(data1);

    return response;
}

export default ViewDocumentsC;
