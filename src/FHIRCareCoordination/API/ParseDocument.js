async function ParseDocument(){
    const url = "http://172.16.19.96/open/apis/default/api/MedvantageTest";
    // const url = window.AppbaseUrl + '/api/ParseDocument/ParseDocument';
    // const head = { accept : '*/*'};
    let data = [];
    const response = await fetch(url, {
        method:'POST',
        // headers: head,
        //body:data
    })
    .then((res) => res.json())
    .then(data);

    return response;
}

export default ParseDocument;
