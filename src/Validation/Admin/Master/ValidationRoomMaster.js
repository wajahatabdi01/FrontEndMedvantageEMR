function ValidationRoomMaster(roomName = "") {
    if (roomName !== "" && roomName.trim().length !== 0 ) {
        return true
    }
    else {
        return false
    }
}
export default ValidationRoomMaster;