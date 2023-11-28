function ValidationLanguageMaster(language = "", abbrivation="", languageName="") {
    if (language !== "" && abbrivation !== "" && languageName !== "" ) {
        return true
    }
    else {
        return false
    }
}
export default ValidationLanguageMaster;