function ValidationLogin(userId = "", password = "") {
    if (userId !== "" && password !== "" && password.trim().length !== 0) {
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (Number.isInteger(parseInt(userId))) {
            return [true, ""]
        }
        else if (userId.match(mailformat)) {
            return [true, ""]
        }
        else {
            return [false, "Please Enter Right User Name"]
        }
    }
    else {
        if (userId === "") {

            return [false, "Please Enter User Name"]
        }
        else if (password === "") {
            return [false, "Please Enter Password"]
        }
    }
}
export default ValidationLogin;