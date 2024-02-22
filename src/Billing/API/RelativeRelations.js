
export default async function RelativeRelations(){

    let URL = window.AdminbaseUrl + `/api/GuardianRelationMaster/GetAllGuardianRelationMaster`;   
    // let URL = window.BillingbaseUrl + `/api/ItemRate/GetAllItemRateByCompany`;  
    let head = {"Content-Type":"application/json", accept:'*/*'};
    let data = {}

    let response = await fetch(URL, {
        headers:head,
        method:'GET'
    }).then(res => res.json()).then(data)    
    return response;
}