function ValidationMenuMaster(menuName = "", url = "", imgUrl = "", tableName = "", description = "", content = "") {
    if (menuName !== "" && menuName.trim().length !== 0 && url !== "" && url.trim().length !== 0 && imgUrl !== "" && imgUrl.trim().length !== 0 && tableName !== "" && tableName.trim().length !== 0 && description !== "" && description.trim().length !== 0 && content !== "" && content.trim().length !== 0) {
        return true
    }
    else {
        return false
    }
}
export default ValidationMenuMaster;