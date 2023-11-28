function ValidationItemMaster(itemName = "", itemCharge = "", categoryId = "") {
    if (itemName !== "" &&  itemName.trim().length !== 0 && itemCharge !== "" &&  itemCharge.trim().length !== 0 && categoryId !== "" &&  categoryId.trim().length !== 0) {
        return true
    }
    else{
        return false
    }
}
export default ValidationItemMaster;