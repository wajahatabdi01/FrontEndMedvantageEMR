function ValidationAddUser(name = "",  email = "", mobileNo = "",  userName = "", roleId="-1", designationId = "-1", departmentId = "") {
    console.log("empNo", typeof empNo)
    if (name !== "" && name.trim().length !== ""  && email !== "" && email.trim().length !== "" &&
        mobileNo !== "" && mobileNo.trim().length !== ""  && userName !== ""  && roleId !== "-1"&& designationId !== "-1"&& departmentId !== "-1" ) {
        return [true, ""]
    }
    
    else if(userName === "" && userName.trim() === "" )
    {
        return [false, "Please Enter Employee Number"]
    }
    else if(name === "" && name.trim() === "" )
    {
     
        return [false, "Please Enter Name"]
    }
    // else if(password === "" && password.trim() === "" )
    // {
    //     return [false, "Please Enter password"]
    // }
    else if(mobileNo === "" && mobileNo.trim() === "" )
    {
        return [false, "Please Enter Mobile Number"]
    }
    else if(designationId === -1  )
    {
        return [false, "Please Select Designation"]
    }
    else if(roleId === -1)
    {
        return [false, "Please Select Role"]
    }
    else if(email === "" && email.trim() === "" )
    {
        return [false, "Please Enter Email"]
    }
    else if(departmentId === -1  )
    {
        return [false, "Please Select departmentId"]
    }
    
}
export default ValidationAddUser;