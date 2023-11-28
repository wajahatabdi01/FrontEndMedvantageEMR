async function GetLabIPDFileData(uhid){
    let url = window.LabServicebaseUrl+`/api/LabIPDFile/GetAllLabIPDFileData?UhID=${uhid}`;
    let head = {'Content-Type' : 'application/JSON', accept: '*/*'};
    let data = {};

    let response = await fetch(url, {
        headers: head,
        method: 'GET'
    }).then((res) => res.json()).then(data);
    return response;
}

export default GetLabIPDFileData;