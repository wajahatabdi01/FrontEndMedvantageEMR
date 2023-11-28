function ValidationLanguageConversionMaster(tableId = "", tableRowId = "", languageId = "", languageText = "") {
    if (tableId !== "0" && tableRowId !== "0" && languageId !== "0" && languageText !== "") {
        return true
    }
    else {
        return false
    }
}
export default ValidationLanguageConversionMaster;