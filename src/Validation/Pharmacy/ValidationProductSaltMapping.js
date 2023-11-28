function ValidationProductSaltMapping(saltId = "", manufacturerId = "", productId = "", unitID = "", consumeTypeId = "",) {
    if (saltId !== "", manufacturerId !== "", productId !== "", unitID !== "", consumeTypeId !== "" ) {
        return true
    }
    else{
        return false
    }
}
export default ValidationProductSaltMapping;