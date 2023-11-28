

export default async function GetPatientVitalGraph(userIds, UHID, vitalIdSearchNew, date = '') {
    let url = ``

    // date = '2022-12-27'
    // UHID = "2202702"
    let userId = 99
    if (date != '') {
        url = window.AppbaseUrl + `/api/PatientVital/GetPatientVitalGraph?userId=${userId}&UHID=${UHID}&vitalIdSearchNew=${vitalIdSearchNew}&vitalDate=${date}`

    }
    else {
        let yourDate = new Date();
        yourDate = yourDate.toISOString().split('T')[0]
        console.log("date", yourDate)
        url = window.AppbaseUrl + `/api/PatientVital/GetPatientVitalGraph?userId=${userId}&UHID=${UHID}&vitalIdSearchNew=${vitalIdSearchNew}&vitalDate=${yourDate}`
    }
    let head = { 'Content-Type': 'application/json', 'accept': '*/*', };
    let data = {};
    let responsonse = await fetch(url, {
        method: 'GET',
        headers: head,
    })
        .then(res => res.json())
        .then(data)
    // console.log(responsonse)

    return responsonse
}
