let SaveSuppliment = async(valResponse)=>{
  let url = window.DietservicesUrl+'/api/MedicationIntake/InsertSupplementIntake';
    //let url = 'https://localhost:7299/api/MedicationIntake/InsertSupplementIntake';
    let head ={'Content-Type':'application/json-patch+json','accept':'*/',};
    let data={};
    let response= await fetch(url,{
        method:'POST',
        headers:head,
        body:JSON.stringify(valResponse)
    }).then(res =>res.json()).then(data);
    return response;
}
export default SaveSuppliment