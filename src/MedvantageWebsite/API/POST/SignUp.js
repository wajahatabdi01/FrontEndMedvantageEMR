let VerifyAndSignUp =async(dataObj, companyLogo)=>{
    // const url=window.UserbaseUrl+"/api/Users/ClientRegistration?name="+dataObj.name+'&userName='+dataObj.userName+'&password='+dataObj.password+'&address='+dataObj.address+'&country='+dataObj.country+'&state='+dataObj.state+'&city='+dataObj.city+'&pinCode='+dataObj.pinCode+'&languagePreferredId='+dataObj.languagePreferredId;
    const url=window.UserbaseUrl+"/api/Users/ClientRegistration"+dataObj;
    console.log("Url", companyLogo)
    const head ={'Content-Type':'application/json','accept':'text/plain',};
    let data ={};
    let response = await fetch(url,{
        method:"POST",
        header:head,
        body: companyLogo
    }).then(res=> res.json()).then(data)                                

    return response;
}

export default VerifyAndSignUp;