async function GetFHIRDemographicData(param) {
    let url = window.AppbaseUrl + "/api/FHIRDemographicData/GetPatientDemographicDataByPid?Uhid="+param.Uhid;
    let head = { "Content-Type": "application/JSON", accept: '*/*' };
    let response = fetch(url, {
        headers: head,
        method: 'GET'
    }).then((res) => res.json()).then(param);

    return response;
}
export default GetFHIRDemographicData;