function ValidationPaymentModeMaster(paymentMethodName = "") {
    if (paymentMethodName !== "" &&  paymentMethodName.trim().length !== 0) {
        return true
    }
    else{
        return false
    }
}
export default ValidationPaymentModeMaster;