export default async function POSTPatientRefer(sendData) {
    let url = ""
    if(sendData.referTypeId === 1)
    {
        url = window.AppbaseUrl + `/api/PatientPrescription/PatientRefer?uhID=${sendData.uhID}&referTypeId=${sendData.referTypeId}&fromDeptId=${sendData.fromDeptId}&toDeptId=${sendData.toDeptId}&reason=${sendData.reason}&UserId=${window.userId}`
    }
    else{
        url = window.AppbaseUrl + `/api/PatientPrescription/PatientRefer?uhID=${sendData.uhID}&referTypeId=${sendData.referTypeId}&reason=${sendData.reason}&outerHospitalName=${sendData.outerHospitalName}&UserId=${window.userId}`

    }
    let head = { 'Content-Type': 'application/json', 'accept': '*/*', };
    let data = {};
    let responsonse = "";
    await fetch(url, {
        method: "POST",
        headers: head,
        body: JSON.stringify(data),
    })
        .then(res => res.json())
        .then(data => { responsonse = data })
        .catch(error => { responsonse = error })


    return responsonse
}
