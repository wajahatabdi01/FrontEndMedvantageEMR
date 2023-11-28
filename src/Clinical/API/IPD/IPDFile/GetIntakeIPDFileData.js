async function GetIntakeIPDFileData(uhid){
    let url = window.DietservicesUrl+`/api/IntakeIPDFile/GetAllIntakeIPDFileData?UhID=${uhid}`;
    let head = {'Content-Type' : 'application/JSON', accept: '*/*'};
    let data = {};

    let response = await fetch(url, {
        headers: head,
        method: 'GET'
    }).then((res) => res.json()).then(data);

    return response;
}

export default GetIntakeIPDFileData;