function ValidationRoomDepartmentAssign(departmentId = "",roomId) {
    if (departmentId !== "" &&  roomId !== "" && departmentId !== "0" &&  roomId !== "0") {
        return true
    }
    else{
        return false
    }
}
export default ValidationRoomDepartmentAssign;