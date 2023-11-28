export default function SearchGlobal(str) {
    var TRange = null;

    if (parseInt(navigator.appVersion) < 4) return;
    var strFound;
    if (window.find) {

        // CODE FOR BROWSERS THAT SUPPORT window.find
        strFound = window.window.self.find(str);
        if (strFound && window.self.getSelection && !window.self.getSelection().anchorNode) {
            strFound = window.self.find(str)
        }
        if (!strFound) {
            strFound = window.self.find(str, 0, 1)
            while (window.self.find(str, 0, 1)) continue
        }
    }
    else if (navigator.appName.indexOf("Microsoft") != -1) {

        // EXPLORER-SPECIFIC CODE

        if (TRange != null) {
            TRange.collapse(false)
            strFound = TRange.findText(str)
            if (strFound) TRange.select()
        }
        if (TRange == null || strFound == 0) {
            TRange = window.self.document.body.createTextRange()
            strFound = TRange.findText(str)
            if (strFound) TRange.select()
        }
    }
    else if (navigator.appName == "Opera") {
        // alert("Opera browsers not supported, sorry...")
        return;
    }
    // if (!strFound) alert("String '" + str + "' not found!")
    // return;

}
