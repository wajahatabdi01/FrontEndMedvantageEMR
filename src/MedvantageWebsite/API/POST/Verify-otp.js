let Verify_Otp =async(otp,emailOrMobile)=>{
    const url=window.UserbaseUrl+"/api/Users/VerifyOtp?userName="+emailOrMobile+'&otp='+otp;
    const head ={'Content-Type':'application/problem+json','accept':'*/*',};
    let data ={};
    let response = await fetch(url,{
        method:"POST",
        header:head,
    }).then(res=> res.json()).then(data)                                

    return response;
}

export default Verify_Otp;