let VerifyEmailOrMobile = async (emailOrMobile)=>{
    const url=window.UserbaseUrl+'/api/Users/SendOtp?userName='+emailOrMobile;
    const head ={'Content-Type':'application/problem+json','accept':'*/*',};
    let data ={};
    let response = await fetch(url,{
        method:"POST",
        header:head,
    }).then(res=> res.json()).then(data)                                

    return response;
}

export default VerifyEmailOrMobile;