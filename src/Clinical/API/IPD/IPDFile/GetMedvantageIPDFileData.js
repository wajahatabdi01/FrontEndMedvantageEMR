async function GetMedvantageIPDFileData(uhid) {
    let url = window.AppbaseUrl + `/api/IPDFileMedvantage/GetAllIPDFileMedvantageData?UhID=${uhid}&clientId=` + window.clientId;
    let head = { 'Content-Type': 'application/JSON', accept: '*/*' };
    let data = {};
    let response = await fetch(url, {
        headers: head,
        method: 'GET'
    }).then((res) => res.json()).then(data);

    return response;
}

export default GetMedvantageIPDFileData;