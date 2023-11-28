async function GetPatientWiseCalculator(objectData) {

    // let url = window.AppbaseUrl + `/api/Calculator/GetPatientWiseCalculator?UHID=${objectData}`;
    let url = window.AppbaseUrl + `/api/Calculator/GetPatientWiseCalculator?UHID=${objectData}&ClientId=${JSON.parse(window.sessionStorage.getItem("LoginData")).clientId}`;
    let head = { "Content-Type": "application/JSON", accept: '*/*' };
    let data = {}
    let response = fetch(url, {
        headers: head,
        method: 'GET'
    })
        .then((res) => res.json())
        .then(data);

    return response;
}
export default GetPatientWiseCalculator;