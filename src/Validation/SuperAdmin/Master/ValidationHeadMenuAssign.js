function ValidationHeadMenuAssign(headID = "", menuID="") {
    if (headID !== "" && headID !== "0" && menuID !== "" && menuID !== "0") {
        return true
    }
    else{
        return false
    }
}
export default ValidationHeadMenuAssign;