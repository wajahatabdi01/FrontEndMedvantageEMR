async function GetEachCCDAComponentDetails(data){
    const url = "http://172.16.19.96/open/apis/default/api/getEachCCDAComponentDetails ";

    const response = await fetch(url, {
        method:'POST',
        // headers: head,
        body:data
    })
    .then((res) => res.text())
    .then(data);

    return response;
}

export default GetEachCCDAComponentDetails;
