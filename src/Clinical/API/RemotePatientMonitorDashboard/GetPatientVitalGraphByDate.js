export default async function GetPatientVitalGraphByDate(userIds, UHID, vitalIdSearchNew, toDate = '', fromDate="") {
    let url = ``

    // date = '2022-12-27'
    // UHID = "2202702"
    let userId = window.userId
    if (toDate !== '') {
        url = window.AppbaseUrl + `/api/PatientVital/GetPatientVitalGraphByDate?userId=${userId}&UHID=${UHID}&vitalIdSearchNew=${vitalIdSearchNew}&vitalDate=${toDate}&CurrentDate=${fromDate}`

    }
    else {
        let defaultDate = new Date();
        defaultDate = defaultDate.toISOString().split('T')[0]
        console.log("date", defaultDate)
        url = window.AppbaseUrl + `/api/PatientVital/GetPatientVitalGraphByDate?userId=${userId}&UHID=${UHID}&vitalIdSearchNew=${vitalIdSearchNew}&vitalDate=${defaultDate}&CurrentDate=${defaultDate}`
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
