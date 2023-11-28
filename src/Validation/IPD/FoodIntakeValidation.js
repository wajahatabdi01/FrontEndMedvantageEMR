function FoodIntakeValidation(textDate = "", textTime = "", quantity = "", FoodList = '0', unitList = '0') {
    const isNumValidate = /^\d{10}$/;
    if (textDate === "") {
      return ['Select Date', 'errDate'];
    } else if (textTime === '') {
      return ['Select Time', 'errTime'];
    }
    else if (FoodList == '0') {
        return ['Please select Food', 'errFood'];
      }
    else if (quantity === '') {
      return ['Enter Quantity', 'errQuantity'];
    } else if (unitList == '0') {
      return ['Please select Unit', 'errUnit'];
    }  else {
      return true;
    }
  }
  
  export default FoodIntakeValidation;
  