async function GetDocumentDetails(data){
    const url = "http://172.16.19.96/open/apis/default/api/DocumentDetails";
    // const url = window.AppbaseUrl + '/api/ParseDocument/ParseDocument';
    // const head = { accept : '*/*'};

    const response = await fetch(url, {
        method:'POST',
        // headers: head,
        body:data
    })
    .then((res) => res.text())
    .then(data);

    return response;
}

export default GetDocumentDetails;
