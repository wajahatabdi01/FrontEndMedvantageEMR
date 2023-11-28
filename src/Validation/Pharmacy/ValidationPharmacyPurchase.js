function ValidationPharmacyPurchase(supplierId = "", filteredData = "") {
    if (supplierId !== "") {
        return true
    }
    else if (filteredData !== ""){
        return true
    }
    // else if (discount !== ""){
    //     return false
    // }
    else{
        return false
    }
}
export default ValidationPharmacyPurchase;