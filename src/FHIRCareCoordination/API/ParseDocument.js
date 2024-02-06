async function ParseDocument(data){
    const url = window.AppbaseUrl + '/api/ParseDocument/ParseDocument';
    // const head = { accept : '*/*'};

    const response = await fetch(url, {
        method:'POST',
        // headers: head,
        body:data
    })
    .then((res) => res.json())
    .then(data);

    return response;
}

export default ParseDocument;
