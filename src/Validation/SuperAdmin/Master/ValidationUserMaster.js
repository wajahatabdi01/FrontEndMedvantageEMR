function ValidationUserMaster(email = "", password="", name="") {
    if (email !== "" &&  email.trim().length !== 0 && password !== "" &&  password.trim().length !== 0 && name !== "" &&  name.trim().length !== 0) {
        return true
    }
    else{
        return false
    }
}
export default ValidationUserMaster;