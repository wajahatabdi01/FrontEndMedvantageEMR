async function PatientInvestigationGraph(userId, UHID, subTestId, date='') {

    let url = ''
    // date = '2022-12-27'
    
    // let userId = 99
    if(date != '')
    {
        url = window.LabServicebaseUrl+`/api/PatientInvestigation/PatientInvestigationGraph?subTestId=${subTestId}&UHID=${UHID}&UserId=${userId}&timeFrom=${date}&clientId=${window.clientId}`;
    }
    else{
        
        let yourDate = new Date();
        yourDate = yourDate.toISOString().split('T')[0]
        console.log("date", yourDate)
        url = window.LabServicebaseUrl+`/api/PatientInvestigation/PatientInvestigationGraph?subTestId=${subTestId}&UHID=${UHID}&UserId=${userId}&timeFrom=${yourDate}&clientId=${window.clientId}`;
    }
    // let head = { 'Content-Type': 'application/json', 'accept': '*/*', };
    let data = {

    };
    let sendResponse =
        await fetch(url, {
            method: "GET",
        })
            .then(res => res.json())
            .then(data)

    return sendResponse;
}
export default PatientInvestigationGraph;