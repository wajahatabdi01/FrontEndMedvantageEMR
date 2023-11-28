let GetSupplementChecklistDetails = async(uhid, date)=>{
    let url = window.DietservicesUrl + "/api/MedicationIntake/GetSupplementIntake?UhID="+uhid+"&fromDate="+date;
    let head = { 'Content-Type': 'application/json', 'accept': '*/*', };
    let responsonse = "";
    await fetch(url, {
        method: "GET",
        headers: head,
        body: JSON.stringify(),
    }).then(res => res.json())
        .then(data => { responsonse = data })
        .catch(error => { responsonse = error })


    return responsonse
}
export default GetSupplementChecklistDetails;