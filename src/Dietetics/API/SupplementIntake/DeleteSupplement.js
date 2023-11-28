  let DeleteSupplement = async(rowID,uhid) =>
{
let url = window.DietservicesUrl+'/api/MedicationIntake/DeleteSupplementIntake?Uhid='+uhid+'&medicationID='+rowID;

let head ={'Content-Type':'application/json-patch+json','accept':'*/',};
let data={};
let response= await fetch(url,{
    method:'DELETE',
    headers:head,
    body:JSON.stringify()
}).then(res =>res.json()).then(data);
return response;
}
export default DeleteSupplement;
