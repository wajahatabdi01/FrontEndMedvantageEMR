// let GetSupplementList = async ()=>{
async function GetSupplementList(){
    let url =window.AppbaseUrl+"/api/KnowMedApis/getSupplimentList";
    let head={"content-type": "application/json", accept:'*/*'};

    let response = fetch(url, {
        headers:head,
        method:'GET'
    })
    .then ((res)=> res.json())
    .then ();
    return response;
}
export default GetSupplementList;