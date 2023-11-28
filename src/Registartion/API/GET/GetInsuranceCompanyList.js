let GetInsuranceCompanyList =async(uhid)=>{
    const clientID=JSON.parse(sessionStorage.getItem("LoginData")).clientId;
    let URL = window.BillingbaseUrl + "/api/TpaCompany/GetAllCompany";  
    const head={'content-type':'application/json','accept':'*/*',}
    let data={};
    let response= await fetch(URL,{
        method:"GET",
        header:head,
    }).then(res=> res.json()).then(data);
    return response;
}
export default GetInsuranceCompanyList;